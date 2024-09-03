import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import MetricAlarmEvent from '@/MetricAlarmEvent';
import { SnsTopic } from 'aws-cdk-lib/aws-events-targets';
import { Topic } from 'aws-cdk-lib/aws-sns';
import BudgetConstruct from '@/BudgetConstruct';
// import { Tags } from 'aws-cdk-lib';

import BaseWebApplicationFirewallRules from '@/BaseWebApplicationFirewallRules';
import AthenaS3Crawler from '@/AthenaS3Crawler';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Function, InlineCode, Runtime } from 'aws-cdk-lib/aws-lambda';

class EntryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    const queue = new sqs.Queue(this, 'HfcCdkStacksQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    // new MetricAlarmEvent(this, 'MetricAlarmEvent', {
    //   metric: queue.metricNumberOfMessagesReceived(),
    //   evaluationPeriods: 1,
    //   threshold: 1,
    //   targets: [new SnsTopic(new Topic(this, 'SampleTargetTopic'))],
    // });

    // new AthenaS3Crawler(this, 'AthenaS3Crawler', {
    //   bucket: new Bucket(this, 'AthenaScanBucket'),
    // });

    // const api = new RestApi(this, 'restApi');

    // const lambda = new Function(this, 'TestLambda', {
    //   code: new InlineCode('return {"statusCode":200, "body": "Number 5 is Alive!"}'),
    //   runtime: Runtime.NODEJS_18_X,
    //   handler: 'index.handler',
    // });

    // api.root.resourceForPath('/heartbeat').addMethod('GET', new LambdaIntegration(lambda));

    // new BaseWebApplicationFirewallRules(this, 'BaseWAFRules', {
    //   resourceArn: api.arnForExecuteApi('*'),
    // });

    const tags = {
      'user:Application': 'CDKBudgetTestingApplication',
    };

    new BudgetConstruct(this, 'test', {
      topicPrefix: 'topic-prefix',
      budgetPrefix: 'budget-prefix',
      limit: 22,
      thresholdNotification: 50,
      thresholdDestroy: 100,
      // tags,
      // add emails here (up to ten)
      recipients: [],
      // tagStack: true,
      tagsForDestruction: tags,
      tagStackForDestruction: true,
    });
  }
}

export default EntryStack;
