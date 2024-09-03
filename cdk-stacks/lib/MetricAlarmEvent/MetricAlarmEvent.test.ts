import * as cdk from 'aws-cdk-lib';
import { ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { Template } from 'aws-cdk-lib/assertions';
import { SnsTopic } from 'aws-cdk-lib/aws-events-targets';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { Topic } from 'aws-cdk-lib/aws-sns';
import MetricAlarmEvent from './MetricAlarmEvent';

describe('MetricAlarmEvent', () => {
  it('Should have expected resources', () => {
    const app = new cdk.App();

    const stack = new cdk.Stack(app, 'MyBaseStack');

    const loadBalancedService = new ApplicationLoadBalancedFargateService(
      stack,
      'loadBalancedService',
      {
        taskImageOptions: {
          image: ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
        },
      },
    );

    new MetricAlarmEvent(stack, 'MyTestStack', {
      metric: loadBalancedService.loadBalancer.metrics.activeConnectionCount(),
      evaluationPeriods: 3,
      threshold: 40,
      targets: [new SnsTopic(new Topic(stack, 'MyTestTopic', {}))],
    });
    // THEN
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::CloudWatch::Alarm', 1);
    template.resourceCountIs('AWS::Events::Rule', 1);
    template.resourceCountIs('AWS::SNS::Topic', 1);
  });
});
