import { Stack } from 'aws-cdk-lib';
import { CfnWebACL, CfnWebACLAssociation } from 'aws-cdk-lib/aws-wafv2';
import { Construct } from 'constructs';

import awsManagedRule from './utils/awsManagedRule';

interface BaseWebApplicationFirewallRulesProps {
  /**
   * Is this for a Region or Cloudfront?
   * https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-webacl.html#cfn-wafv2-webacl-scope
   */
  scope?: 'REGIONAL' | 'CLOUDFRONT',
  /**
   * A prefix for names output by this construct.
   * This includes the visibility config in cloudfront, the rules,
   * and the managed rule group statement.
   */
  namePrefix?: string,
  /**
   * The ARN of the resource to associate this with. For types available, see the aws docs.
   * https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-webacl.html#cfn-wafv2-webacl-scope
   */
  resourceArn?: string,
  /**
   * More rules to add in addition to the managed rules
   */
  extraRules?: CfnWebACL.RuleProperty[]
}

class BaseWebApplicationFirewallRules extends Construct {
  constructor(scope: Construct, id: string, props: BaseWebApplicationFirewallRulesProps) {
    super(scope, id);

    const {
      scope: firewallScope = 'REGIONAL',
      namePrefix = '',
      resourceArn,
      extraRules = [],
    } = props;

    if (firewallScope === 'REGIONAL' && !resourceArn) {
      throw new Error('When scope is REGIONAL, resourceArn is required');
    }
    if (firewallScope === 'CLOUDFRONT' && resourceArn) {
      throw new Error('When scope is CLOUDFRONT, resourceArn should not exist.');
    }
    if (firewallScope === 'CLOUDFRONT' && Stack.of(this).region !== 'us-east-1') {
      throw new Error('Cloudfront Scoped WAF must be to us-east-1 as per https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-webacl.html#cfn-wafv2-webacl-scope');
    }

    // The code that defines your stack goes here
    const webACL = new CfnWebACL(this, 'WebACL', {
      scope: firewallScope,
      defaultAction: {
        allow: {},
      },
      rules: [
        awsManagedRule({
          priority: 10,
          ruleName: `${namePrefix}managed-common-rules`,
          awsName: 'AWSManagedRulesCommonRuleSet',
          metricName: `${namePrefix}metric-managed-common-rules`,
        }),
        awsManagedRule({
          priority: 20,
          ruleName: `${namePrefix}ip-reputation-rules`,
          awsName: 'AWSManagedRulesAmazonIpReputationList',
          metricName: `${namePrefix}metric-ip-reputation-rules`,
        }),
        awsManagedRule({
          priority: 30,
          ruleName: `${namePrefix}known-bad-inputs`,
          awsName: 'AWSManagedRulesKnownBadInputsRuleSet',
          metricName: `${namePrefix}metric-known-bad-inputs`,
        }),
        ...extraRules,
      ],
      visibilityConfig: {
        cloudWatchMetricsEnabled: false,
        metricName: `${namePrefix}metric-waf`,
        sampledRequestsEnabled: false,
      },
    });

    if (resourceArn) {
      new CfnWebACLAssociation(
        this,
        'WebACLAssociation',
        {
          resourceArn,
          webAclArn: webACL.attrArn,
        },
      );
    }
  }
}

export default BaseWebApplicationFirewallRules;
