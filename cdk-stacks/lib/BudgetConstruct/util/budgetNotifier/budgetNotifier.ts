import { CfnBudget } from 'aws-cdk-lib/aws-budgets';
import { Construct } from 'constructs';
import { BudgetNotifierProps } from './budgetNotifierProps';
import NotificationType from './notificationType';
import TimeUnit from './timeUnit';

function validateProperties(props: BudgetNotifierProps): void {
  if (props.recipients && props.recipients.length > 10) {
    throw new Error(
      'The maximum number of 10 e-mail recipients is exceeded.',
    );
  }

  if (props.threshold <= 0) {
    throw new Error('Thresholds less than or equal to 0 are not allowed.');
  }
}

function createSubscribers(props: BudgetNotifierProps) {
  const subscribers: CfnBudget.SubscriberProperty[] = [];
  if (props.recipients) {
    props.recipients.forEach((recipient) => {
      subscribers.push({
        address: recipient,
        subscriptionType: 'EMAIL',
      });
    });
  }
  if (props.topicArn) {
    subscribers.push({
      address: props.topicArn,
      subscriptionType: 'SNS',
    });
  }

  return subscribers;
}

function createCostFilters(props: BudgetNotifierProps) {
  const tags: Array<string> = [];

  if (props.tags) {
    Object.entries(props.tags).forEach(([key, value]) => {
      tags.push(`${key}$${value}`);
    });
  }

  const costFilters: any = {};

  if (tags && tags.length > 0) {
    costFilters.TagKeyValue = tags;
  }
  const availabilityZones: Array<string> = [];
  if (props.availabilityZones) {
    props.availabilityZones.forEach((az) => {
      availabilityZones.push(az);
    });
    costFilters.AZ = availabilityZones;
  }
  return costFilters;
}

class BudgetNotifier extends Construct {
  constructor(scope: Construct, id: string, props: BudgetNotifierProps) {
    super(scope, id);

    validateProperties(props);

    const costFilters = createCostFilters(props);
    const subscribers = createSubscribers(props);

    new CfnBudget(this, `MonthlyBudget_${id}`, {
      budget: {
        budgetType: 'COST',
        timeUnit: props.timeUnit ? props.timeUnit : TimeUnit.MONTHLY,
        budgetLimit: {
          amount: props.limit,
          unit: props.unit,
        },
        costFilters,
      },

      notificationsWithSubscribers: [
        {
          notification: {
            comparisonOperator: 'GREATER_THAN',
            threshold: props.threshold,
            thresholdType: 'PERCENTAGE',
            notificationType: props.notificationType
              ? props.notificationType
              : NotificationType.ACTUAL,
          },
          subscribers,
        },
      ],
    });
  }
}

export default BudgetNotifier;
