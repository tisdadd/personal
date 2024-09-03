import * as cdk from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { Role } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { CfnCrawler } from 'aws-cdk-lib/aws-glue';
import { Database } from '@aws-cdk/aws-glue-alpha';
import { CfnNamedQuery, CfnWorkGroup } from 'aws-cdk-lib/aws-athena';

interface AthenaS3CrawlerProps {
  /** S3 Bucket to Crawl with Glue */
  bucket: Bucket,
  /** Strings to create named queries for in Athena
   *
   * Use DATABASE_NAME to have it replaced with the glue database name once determined.
   */
  queryStrings?: string[];
}

class AthenaS3Crawler extends Construct {
  readonly athenaWorkgroup: CfnWorkGroup;

  readonly database: Database;

  constructor(scope: Construct, id: string, props: AthenaS3CrawlerProps) {
    super(scope, id);

    const { bucket, queryStrings = [] } = props;

    const logCrawlerRole = new Role(
      this,
      'LogCrawlerRole',
      {
        assumedBy: new cdk.aws_iam.ServicePrincipal('glue.amazonaws.com'),
      },
    );

    this.database = new Database(
      this,
      'GlueDatabase',
      {
      },
    );

    new CfnCrawler(
      this,
      'LogCrawler',
      {
        role: logCrawlerRole.roleArn,
        targets: {
          s3Targets: [
            {
              path: `s3://${bucket.bucketName}`,
            },
          ],
        },
        configuration: JSON.stringify({
          Version: 1.0,
          Grouping: { TableGroupingPolicy: 'CombineCompatibleSchemas' },
          CrawlerOutput: {
            Partitions: { AddOrUpdateBehavior: 'InheritFromTable' },
            Tables: { AddOrUpdateBehavior: 'MergeNewColumns' },
          },
        }),
      },
    );

    bucket.grantRead(logCrawlerRole);

    const athenaQueryResultsBucket = new Bucket(
      this,
      'AthenaQueryResultsBucket',
      {
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      },
    );

    this.athenaWorkgroup = new CfnWorkGroup(
      this,
      'AthenaWorkgroup',
      {
        name: `${bucket.bucketName}-athena-workgroup-results`,
        workGroupConfiguration: {
          resultConfiguration: {
            outputLocation: `s3://${athenaQueryResultsBucket.bucketName}`,
          },
        },
      },
    );

    queryStrings.forEach((query, index) => {
      const queryString = query.replace(/DATABASE_NAME/i, this.database.databaseName);

      const namedQuery = new CfnNamedQuery(this, `GlueQuery${index}`, {
        database: this.database.databaseName,
        queryString,
        workGroup: this.athenaWorkgroup.name,
      });
      namedQuery.addDependency(this.athenaWorkgroup);
    });
  }
}

export default AthenaS3Crawler;
