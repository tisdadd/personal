> [Up One Level](../readme.md)

# BaseWebApplicationFirewallRules

Add the basic managed Web Application Firewall rules while allowing more as needed.
Note that the default action associated here is allow, as it is assuming attachment to a publicly available website.

Includes 3 managed rules, each with metrics enabled - AWSManagedRulesCommonRuleSet (priority 10), AWSManagedRulesAmazonIpReputationList (priority 20), and AWSManagedRulesKnownBadInputsRuleSet (priority 30).

- [utils/](utils/readme.md) - Utility functions for this construct.
- BaseWebApplicationFirewallRules.test.ts - The tests for this component
- BaseWebApplicationFirewallRules.ts - The actual component
- index.js - Easy import elsewhere for this component