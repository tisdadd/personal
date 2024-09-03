import awsManagedRule from './awsManagedRule';

describe('awsManagedRule', () => {
  it('Fills in expected template with parameters', () => {
    const priority = 100;
    const awsName = 'Test Name';
    const ruleName = 'Test Rule Name';
    const metricName = 'Test Metric Name';

    const expected = {
      name: ruleName,
      priority,
      overrideAction: {
        none: {},
      },
      statement: {
        managedRuleGroupStatement: {
          name: awsName,
          vendorName: 'AWS',
        },
      },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName,
        sampledRequestsEnabled: true,
      },
    };

    const output = awsManagedRule({
      priority,
      awsName,
      ruleName,
      metricName,
    });

    expect(output).toEqual(expected);
  });
});
