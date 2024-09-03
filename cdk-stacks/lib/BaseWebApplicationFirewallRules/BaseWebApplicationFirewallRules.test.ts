import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import BaseWebApplicationFirewallRules from './BaseWebApplicationFirewallRules';
import awsManagedRule from './utils/awsManagedRule';

describe('BaseWebApplicationFirewallRules', () => {
  it('Should require a resourceArn if REGIONAL scope (default)', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new cdk.Stack(app, 'MyBaseStack');

    expect(() => {
      new BaseWebApplicationFirewallRules(stack, 'MyBaseWebApplicationFirewallRules', {

      });
    }).toThrowError(/When scope is REGIONAL, resourceArn is required/);

    expect(() => {
      new BaseWebApplicationFirewallRules(stack, 'MyBaseWebApplicationFirewallRules2', {
        resourceArn: '1234',
      });
    }).not.toThrow();
  });

  it('Should require there be no resourceArn if CLOUDFRONT scope', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new cdk.Stack(app, 'MyBaseStack', { env: { region: 'us-east-1' } });

    expect(() => {
      new BaseWebApplicationFirewallRules(stack, 'MyBaseWebApplicationFirewallRules', {
        scope: 'CLOUDFRONT',
        resourceArn: '1234',
      });
    }).toThrowError(/When scope is CLOUDFRONT, resourceArn should not exist./);

    expect(() => {
      new BaseWebApplicationFirewallRules(stack, 'MyBaseWebApplicationFirewallRules2', {
        scope: 'CLOUDFRONT',
      });
    }).not.toThrow();
  });

  it('Should require stack region be us-east-1 if CLOUDFRONT scope', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new cdk.Stack(app, 'MyBaseStack', { env: { region: 'us-west-1' } });

    expect(() => {
      new BaseWebApplicationFirewallRules(stack, 'MyBaseWebApplicationFirewallRules2', {
        scope: 'CLOUDFRONT',
      });
    }).toThrowError(/Cloudfront Scoped WAF must be to us-east-1 as per https:\/\/docs.aws.amazon.com\/AWSCloudFormation\/latest\/UserGuide\/aws-resource-wafv2-webacl.html#cfn-wafv2-webacl-scope/);
  });

  it('Should have base resources and rules with CLOUDFRONT scope', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new cdk.Stack(app, 'MyBaseStack', { env: { region: 'us-east-1' } });

    new BaseWebApplicationFirewallRules(stack, 'MyBaseWebApplicationFirewallRules2', {
      scope: 'CLOUDFRONT',
    });

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::WAFv2::WebACL', 1);
    template.resourceCountIs('AWS::WAFv2::WebACLAssociation', 0);

    const [webACL] = Object.values(template.findResources('AWS::WAFv2::WebACL'));

    expect(webACL.Properties.Rules.length).toBe(3);

    expect(webACL.Properties.Rules.filter(({ Statement: { ManagedRuleGroupStatement: { Name = '' } } }) => ['AWSManagedRulesCommonRuleSet', 'AWSManagedRulesAmazonIpReputationList', 'AWSManagedRulesKnownBadInputsRuleSet'].indexOf(Name) > -1).length).toBe(3);
  });

  it('Should have an additional association if regional', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new BaseWebApplicationFirewallRules(stack, 'MyBaseWebApplicationFirewallRules2', {
      resourceArn: 'Arn123',
    });

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::WAFv2::WebACL', 1);
    template.resourceCountIs('AWS::WAFv2::WebACLAssociation', 1);
  });

  it('And can have extra rules added', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new BaseWebApplicationFirewallRules(stack, 'MyBaseWebApplicationFirewallRules2', {
      resourceArn: 'Arn123',
      extraRules: [
        awsManagedRule({
          priority: 50,
          awsName: 'SampleRuleThatIsNotReal',
          ruleName: 'SampleRule',
          metricName: 'SampleMetric',
        }),
      ],
    });

    const template = Template.fromStack(stack);

    const [webACL] = Object.values(template.findResources('AWS::WAFv2::WebACL'));
    expect(webACL.Properties.Rules.length).toBe(4);

    expect(webACL.Properties.Rules.filter(({ Statement: { ManagedRuleGroupStatement: { Name = '' } } }) => ['AWSManagedRulesCommonRuleSet', 'AWSManagedRulesAmazonIpReputationList', 'AWSManagedRulesKnownBadInputsRuleSet', 'SampleRuleThatIsNotReal'].indexOf(Name) > -1).length).toBe(4);
  });
});
