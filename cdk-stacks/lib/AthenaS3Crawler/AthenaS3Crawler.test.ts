import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import AthenaS3Crawler from './AthenaS3Crawler';

describe('AthenaS3Crawler', () => {
  it('Should have the right resources counts', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new AthenaS3Crawler(stack, 'MyAthenaS3Crawler', {
      bucket: new Bucket(stack, 'Bucket', {}),
      queryStrings: ['SELECT COUNT(*) FROM DATABASE_NAME'],
    });
    // THEN
    const template = Template.fromStack(stack);

    // initial bucket, plus output bucket
    template.resourceCountIs('AWS::S3::Bucket', 2);
    template.resourceCountIs('AWS::Glue::Database', 1);
    template.resourceCountIs('AWS::Glue::Crawler', 1);
    template.resourceCountIs('AWS::Athena::NamedQuery', 1);
    template.resourceCountIs('AWS::Athena::WorkGroup', 1);
  });

  it('Should update the query strings', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new AthenaS3Crawler(stack, 'MyAthenaS3Crawler', {
      bucket: new Bucket(stack, 'Bucket', {}),
      queryStrings: ['SELECT COUNT(*) FROM DATABASE_NAME'],
    });
    // THEN
    const template = Template.fromStack(stack);

    // initial bucket, plus output bucket
    template.hasResourceProperties('AWS::Athena::NamedQuery', {
      QueryString: {
        'Fn::Join': ['', ['SELECT COUNT(*) FROM ', { Ref: Match.anyValue() }]],
      },
    });
  });
});
