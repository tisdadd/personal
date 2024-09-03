import { CreateAlarmOptions, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { IRuleTarget, Rule } from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

interface MetricAlarmEventProps extends CreateAlarmOptions {
  /**
   * The metric for alarm. Can be custom created, or made through something like
   * loadBalancer.metrics.activeConnectionCount();
   */
  metric: Metric,
  /**
   * Targets to send the event information to.
   */
  targets: IRuleTarget[]
}

class MetricAlarmEvent extends Construct {
  constructor(scope: Construct, id: string, props: MetricAlarmEventProps) {
    super(scope, id);

    const {
      metric,
      targets,
      ...createAlarmOptions
    } = props;

    const alarm = metric.createAlarm(this, 'metricAlarm', {
      ...createAlarmOptions,
    });

    new Rule(
      this,
      'alarmTriggeredChangeEventRule',
      {
        description: `Triggers an event based on the metric ${metric.metricName} going to alarm state.`,
        eventPattern: {
          source: ['aws.cloudwatch'],
          detailType: ['CloudWatch Alarm State Change'],
          resources: [alarm.alarmArn],
          detail: {
            state: { value: ['ALARM'] },
          },
        },
        targets,
      },
    );
  }
}

export default MetricAlarmEvent;
