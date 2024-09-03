type AwsManagedRuleInput = {
  priority: number;
  awsName: string;
  ruleName: string;
  metricName: string;
};
function awsManagedRule({
  priority,
  awsName,
  ruleName,
  metricName,
}: AwsManagedRuleInput) {
  return {
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
}

export default awsManagedRule;
