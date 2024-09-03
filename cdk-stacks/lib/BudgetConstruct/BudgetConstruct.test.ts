import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Function, InlineCode, Runtime } from 'aws-cdk-lib/aws-lambda';
import BudgetConstruct from './BudgetConstruct';

interface Subscriber {
  Address: string | {
    Ref: string
  },
  SubscriptionType: string
}

describe('BudgetConstruct', () => {
  it('Requires at least one threshold', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'MyBaseStack');

    expect(() => {
      new BudgetConstruct(stack, 'MyBudget1', {
        topicPrefix: 'topic-prefix1',
        budgetPrefix: 'budget-prefix1',
        limit: 100,
      });
    }).toThrowError(/At least one threshold is required./);

    expect(() => {
      new BudgetConstruct(stack, 'MyBudget2', {
        topicPrefix: 'topic-prefix2',
        budgetPrefix: 'budget-prefix2',
        thresholdNotification: 85,
        limit: 100,
      });
    }).not.toThrow();

    expect(() => {
      new BudgetConstruct(stack, 'MyBudget3', {
        topicPrefix: 'topic-prefix3',
        budgetPrefix: 'budget-prefix3',
        accountLevelDestroyItAll: true,
        thresholdDestroy: 85,
        limit: 100,
      });
    }).not.toThrow();
  });

  it('Needs a softThresholdFunction if softThreshold is given', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'MyBaseStack');

    expect(() => {
      new BudgetConstruct(stack, 'MyBudget', {
        topicPrefix: 'topic-prefix',
        budgetPrefix: 'budget-prefix',
        thresholdSoftShutdown: 85,
        limit: 100,
      });
    }).toThrowError(/thresholdSoftShutdown needs a softThresholdFunction to work/);

    expect(() => {
      new BudgetConstruct(stack, 'MyBudget1', {
        topicPrefix: 'topic-prefix',
        budgetPrefix: 'budget-prefix',
        thresholdSoftShutdown: 85,
        limit: 100,
        softThresholdFunction: new Function(stack, 'TestLambda', {
          code: new InlineCode('console.log("Hello");'),
          runtime: Runtime.NODEJS_18_X,
          handler: 'index.handler',
        }),
      });
    }).not.toThrow();
  });

  it('Should contain one budget per threshold', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new BudgetConstruct(stack, 'MyBudget', {
      topicPrefix: 'topic-prefix',
      budgetPrefix: 'budget-prefix',
      thresholdNotification: 85,
      thresholdSoftShutdown: 97,
      accountLevelDestroyItAll: true,
      thresholdDestroy: 110,
      limit: 100,
      softThresholdFunction: new Function(stack, 'TestLambda', {
        code: new InlineCode('console.log("Hello");'),
        runtime: Runtime.NODEJS_18_X,
        handler: 'index.handler',
      }),
    });

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Budgets::Budget', 3);
  });

  it('And appropriate settings for those budgets', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new BudgetConstruct(stack, 'MyBudget', {
      topicPrefix: 'topic-prefix',
      budgetPrefix: 'budget-prefix',
      thresholdNotification: 85,
      thresholdSoftShutdown: 97,
      accountLevelDestroyItAll: true,
      thresholdDestroy: 110,
      recipients: ['abc@123.com'],
      limit: 100,
      softThresholdFunction: new Function(stack, 'TestLambda', {
        code: new InlineCode('console.log("Hello");'),
        runtime: Runtime.NODEJS_18_X,
        handler: 'index.handler',
      }),
    });

    const template = Template.fromStack(stack);
    const budgets = template.findResources('AWS::Budgets::Budget');

    Object.entries(budgets).forEach(([key, value]) => {
      const {
        Properties: {
          Budget:
          {
            BudgetLimit:
            {
              Amount,
              Unit,
            },
            BudgetType,
            TimeUnit,
          },
          NotificationsWithSubscribers: [
            {
              Notification: {
                ComparisonOperator,
                NotificationType,
                Threshold,
                ThresholdType,
              },
              Subscribers,
            },
          ],
        },
      } = value;
      expect(Amount).toBe(100);
      expect(Unit).toBe('USD');
      expect(BudgetType).toBe('COST');
      expect(TimeUnit).toBe('MONTHLY');
      expect(ComparisonOperator).toBe('GREATER_THAN');
      expect(NotificationType).toBe('ACTUAL');
      expect(ThresholdType).toBe('PERCENTAGE');

      expect(Subscribers.filter(({ Address, SubscriptionType }: Subscriber) => Address === 'abc@123.com' && SubscriptionType === 'EMAIL').length).toBe(1);

      expect(Subscribers.filter(({ Address, SubscriptionType }: Subscriber) => typeof Address === 'object' && Address.Ref.indexOf('topicprefix') > -1 && SubscriptionType === 'SNS').length).toBe(1);

      if (key.indexOf('destroystack') > -1) {
        expect(Threshold).toBe(110);
      }
      if (key.indexOf('budgetnotify') > -1) {
        expect(Threshold).toBe(85);
      }
      if (key.indexOf('softshutdown') > -1) {
        expect(Threshold).toBe(97);
      }
    });
  });

  it('Should contain a lambda if using the thresholdDestroy', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new BudgetConstruct(stack, 'MyBudget', {
      topicPrefix: 'topic-prefix',
      budgetPrefix: 'budget-prefix',
      accountLevelDestroyItAll: true,
      thresholdDestroy: 110,
      limit: 100,
    });

    const template = Template.fromStack(stack);
    // one lambda created for retention policy of thresholdDestroy logs
    template.resourceCountIs('AWS::Lambda::Function', 2);
  });

  it('Should contain a lambda if using thresholdSoftShutdown', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new BudgetConstruct(stack, 'MyBudget', {
      topicPrefix: 'topic-prefix',
      budgetPrefix: 'budget-prefix',
      thresholdSoftShutdown: 97,
      limit: 100,
      softThresholdFunction: new Function(stack, 'TestLambda', {
        code: new InlineCode('console.log("Hello");'),
        runtime: Runtime.NODEJS_18_X,
        handler: 'index.handler',
      }),
    });

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Lambda::Function', 1);
  });

  it('Should no lambdas if only using thresholdNotify', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new BudgetConstruct(stack, 'MyBudget', {
      topicPrefix: 'topic-prefix',
      budgetPrefix: 'budget-prefix',
      thresholdNotification: 85,
      limit: 100,
    });

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Lambda::Function', 0);
  });

  it('Should contain two lambdas if using thresholdSoftShutdown and thresholdDestroy', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new BudgetConstruct(stack, 'MyBudget', {
      topicPrefix: 'topic-prefix',
      budgetPrefix: 'budget-prefix',
      thresholdSoftShutdown: 97,
      thresholdDestroy: 110,
      tagsForDestruction: {
        'user:myTag': 'Destroy',
      },
      limit: 100,
      softThresholdFunction: new Function(stack, 'TestLambda', {
        code: new InlineCode('console.log("Hello");'),
        runtime: Runtime.NODEJS_18_X,
        handler: 'index.handler',
      }),
    });

    const template = Template.fromStack(stack);
    // one lambda created for retention policy of thresholdDestroy logs
    template.resourceCountIs('AWS::Lambda::Function', 3);
  });

  it('Should contain a filter for an application tag if passed', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new BudgetConstruct(stack, 'MyBudget', {
      topicPrefix: 'topic-prefix',
      budgetPrefix: 'budget-prefix',
      thresholdNotification: 97,
      limit: 100,
      tags: {
        'user:Application': 'TestingApp',
      },
    });

    const template = Template.fromStack(stack);
    const budgets = template.findResources('AWS::Budgets::Budget');
    expect(Object.values(budgets)[0].Properties.Budget.CostFilters.TagKeyValue[0]).toBe('user:Application$TestingApp');
  });
});
