> [Up One Level](../readme.md)

# BudgetConstruct

A construct to help stick to a monthly budget. It has the ability to notify when hitting a specific cost, as well as getting passed a function to run at a threshold and a total teardown function (minus any termination protected elements) included for the final threshold.

Note that Budgets itself has some built in limits - it updates usage 2-3 times a day, and for forecast notifications it needs 5 weeks of data. Also, notifications may fire a second time when using forecasted if the forecasted goes down between notifications, then back over. In addition to this - if the tagged stacks (or account if running account level) is already past the budget that the budget triggers may happen and SNS will fire before lambdas to handle them have taken effect.

To filter by tags you may need to [activate them](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html). This is helpful when passing `application`, `costCenter`, or `service`.

- [util/](util/readme.md) - Utility functions for this component
- BudgetConstruct.test.ts - The tests for this component
- BudgetConstruct.ts - The actual component
- index.js - Easy import elsewhere for this component