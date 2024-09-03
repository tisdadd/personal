> [Up One Level](../readme.md)

# SelfUpdatingCdkPipelineStack

This stack is meant to self synth and deploy other stacks as part of a CI/CD pipeline. It should be simple to use in a project with the CDK in it.

This is built on top of [the Pipeline (CDK Pipelines)](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.pipelines-readme.html) instead of the direct [Code Pipeline](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_codepipeline-readme.html). This allows it to do some things automagically in the background, however some phrased used may seem a bit different than what one would expect. Take a quick look at [deploying](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.pipelines-readme.html#cdk-application-deployments) to find out more about Stages and Waves in this context. Stages are basically sets of stacks (what may be thought of as the main stacks that make an application and deploy as one set) targeting a specific region/account combination. Waves are sets that can run those stage deployments in parallel.

- [util/](util/readme.md) - Utility components/functions for this component.
- SelfUpdatingCdkPipelineStack.test.ts - The tests for this component
- SelfUpdatingCdkPipelineStack.ts - The actual component
- index.js - Easy import elsewhere for this component