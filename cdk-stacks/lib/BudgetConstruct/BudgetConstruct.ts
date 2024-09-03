import { Construct } from 'constructs';

import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Duration, Stack, Tags } from 'aws-cdk-lib';
import { EmailSubscription, LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { BudgetNotifier, NotificationType, TimeUnit } from './util/budgetNotifier';

interface BudgetConstructProps {
  /** sns topic prefix - rest will be based on severity */
  topicPrefix: string,
  /** email notifications to who? */
  recipients?: string[],
  /** how much currency unit */
  limit: number,
  /** what currency code */
  unit?: string,
  /** simply notify at a threshold (percentage) */
  thresholdNotification?: number,
  /** for shutting things down, but not destroying them */
  thresholdSoftShutdown?: number,
  /** for destroying everything in the stack */
  thresholdDestroy?: number,
  /** what to do if the soft shutdown is reached */
  softThresholdFunction?: IFunction,
  /** filter for availability zones available if desired */
  availabilityZones?: string[],
  /** is this looking at cost or forecasted value */
  notificationType?: NotificationType,
  /** prefix for the budgets */
  budgetPrefix?: string
  /** destroy all stacks this has access to if not teardown protected on thresholdDestroy */
  accountLevelDestroyItAll?: boolean,
  /** destroy only stacks with given tags on thresholdDestroy */
  tagsForDestruction?: {
    [key: string]: string
  },
  /** tag stack for destruction on thresholdDestroy */
  tagStackForDestruction?: boolean,
  /** Tags for the cost allocation purposes only */
  tags?: {
    [key: string]: string
  },
  /** Tag stack with all tags */
  tagStack?: boolean
  /** Time unit for the budget - defaults to monthly */
  timeUnit?: TimeUnit
}

class BudgetConstruct extends Construct {
  constructor(scope: Construct, id: string, props: BudgetConstructProps) {
    super(scope, id);

    const {
      topicPrefix,
      thresholdDestroy,
      thresholdNotification,
      thresholdSoftShutdown,
      softThresholdFunction,
      availabilityZones,
      limit,
      recipients,
      budgetPrefix = 'general',
      unit = 'USD',
      notificationType = NotificationType.ACTUAL,
      accountLevelDestroyItAll = false,
      tags = {},
      tagStack = false,
      tagsForDestruction = {},
      tagStackForDestruction = false,
      timeUnit,
    } = props;

    if (!thresholdDestroy && !thresholdNotification && !thresholdSoftShutdown) {
      throw new Error('At least one threshold is required.');
    }

    if (thresholdSoftShutdown && !softThresholdFunction) {
      throw new Error('thresholdSoftShutdown needs a softThresholdFunction to work');
    }

    if (tagStack && Object.keys(tags).length < 1) {
      throw new Error('tagStack requires keys to tag with');
    }

    if (tagStack) {
      Object.entries(tags).forEach(([key, value]) => {
        Tags.of(Stack.of(this)).add(key, value);
      });
    }

    const generateBudgetNotifier = (
      topicName: string,
      budgetName: string,
      notifierThreshold: number,
    ) => {
      const topic = new Topic(this, topicName, {
        displayName: topicName,
      });
      topic.addToResourcePolicy(new PolicyStatement({
        actions: ['sns:Publish'],
        effect: Effect.ALLOW,
        resources: [topic.topicArn],
        principals: [new ServicePrincipal('budgets.amazonaws.com')],
        conditions: {
          ArnEquals: {
            'aws:SourceArn': `arn:aws:budgets::${Stack.of(this).account}:*`,
          },
          StringEquals: {
            'aws:SourceAccount': Stack.of(this).account,
          },
        },
      }));
      const budgetNotifier = new BudgetNotifier(this, budgetName, {
        topicArn: topic.topicArn,
        limit,
        unit,
        threshold: notifierThreshold,
        availabilityZones,
        tags,
        notificationType,
        recipients,
        timeUnit,
      });

      return { topic, budgetNotifier };
    };

    if (thresholdNotification) {
      generateBudgetNotifier(`${topicPrefix}-notify-budget`, `${budgetPrefix}-budget-notify`, thresholdNotification);
    }

    if (thresholdDestroy) {
      // verbose errors if needed

      const keyLength = Object.keys(tagsForDestruction).length;

      if (!accountLevelDestroyItAll && keyLength === 0) {
        throw new Error('destroyItAll or tagsForDestruction is required with thresholdDestroy');
      }

      if (accountLevelDestroyItAll && keyLength > 0) {
        throw new Error('destroyItAll only works with no tagsForDestruction');
      }

      if (!accountLevelDestroyItAll && keyLength === 0) {
        throw new Error('tagsForDestruction are required if destroyItAll is not enabled');
      }

      if (tagStackForDestruction && keyLength === 0) {
        throw new Error('tagStackForDestruction only works with tagsForDestruction');
      }

      if (tagStackForDestruction) {
        Object.entries(tagsForDestruction).forEach(([key, value]) => {
          Tags.of(Stack.of(this)).add(key, value);
        });
      }

      const notificationTopicDestroy = new Topic(this, `${topicPrefix}-destroy-stack-notification-function`, {
        displayName: `${topicPrefix}-destroy-stack-notification-function`,
      });

      const environment: { [key: string]: string } = {
        ALERTS_TOPIC: notificationTopicDestroy.topicArn,
        RUNNING_IN_STACK_ID: Stack.of(this).stackId,
      };

      if (recipients && recipients.length > 0) {
        recipients.forEach((email) => {
          notificationTopicDestroy.addSubscription(new EmailSubscription(email));
        });
      }

      if (accountLevelDestroyItAll) {
        environment.DESTROY_IT_ALL = 'true';
      } else {
        environment.TAGS = JSON.stringify(tagsForDestruction);
      }

      const emergencyTearDownFunction = new NodejsFunction(this, 'emergencyTearDownFunction', {
        entry: 'lib/BudgetConstruct/util/emergency-tear-down/emergency-tear-down.ts',
        environment,
        initialPolicy: [
          new PolicyStatement({
            actions: ['cloudformation:DescribeStacks', 'cloudformation:DeleteStack', 'cloudformation:ListStacks'],
            resources: ['*'],
          }),
        ],
        memorySize: 128,
        timeout: Duration.minutes(5),
        runtime: Runtime.NODEJS_18_X,
        logRetention: RetentionDays.ONE_MONTH,
      });
      notificationTopicDestroy.grantPublish(emergencyTearDownFunction);

      const { topic } = generateBudgetNotifier(`${topicPrefix}-destroy-stack`, `${budgetPrefix}-budget-destroy-stack`, thresholdDestroy);
      topic.addSubscription(new LambdaSubscription(emergencyTearDownFunction));
    }

    if (thresholdSoftShutdown && softThresholdFunction) {
      const { topic } = generateBudgetNotifier(`${topicPrefix}-soft-shutdown`, `${budgetPrefix}-budget-soft-shutdown`, thresholdSoftShutdown);
      topic.addSubscription(new LambdaSubscription(softThresholdFunction));
    }
  }
}

export default BudgetConstruct;
