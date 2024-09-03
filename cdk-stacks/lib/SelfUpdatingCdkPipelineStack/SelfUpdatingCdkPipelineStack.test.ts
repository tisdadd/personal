import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CodePipelineSource, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import SelfUpdatingCdkPipelineStack from './SelfUpdatingCdkPipelineStack';
import StageWithGenerator from './util/StageWithGenerator';

const accountRegionDeploymentMapping = {
  abc123: ['us-west-1', 'us-east-1'],
};
const inputSource = CodePipelineSource.gitHub('owner/repo', 'main');
const synth = new ManualApprovalStep('Extends IFileSetProducer, not practical');
const synthUsesDocker = true;

describe('SelfUpdatingCdkPipelineStack', () => {
  it('Throws an error for no input or synth', () => {
    const app = new cdk.App();
    // WHEN
    expect(() => {
      new SelfUpdatingCdkPipelineStack(app, 'MyTestStack', {
        accountRegionDeploymentMapping,
      });
    }).toThrowError(/Prop inputSource is required without explicit synth prop/);

    expect(() => {
      new SelfUpdatingCdkPipelineStack(app, 'MyTestStack2', {
        accountRegionDeploymentMapping,
        inputSource,
      });
    }).not.toThrowError(/Prop inputSource is required without explicit synth prop/);

    expect(() => {
      new SelfUpdatingCdkPipelineStack(app, 'MyTestStack3', {
        accountRegionDeploymentMapping,
        synth,
      });
    }).not.toThrowError(/Prop inputSource is required without explicit synth prop/);
  });

  it('Throws an error for synthUsesDocker when no synth passed in', () => {
    const app = new cdk.App();
    // WHEN
    expect(() => {
      new SelfUpdatingCdkPipelineStack(app, 'MyTestStack', {
        accountRegionDeploymentMapping,
        inputSource,
        synthUsesDocker,
      });
    }).toThrowError(/Cannot use synthUsesDocker without a custom synth prop/);

    expect(() => {
      new SelfUpdatingCdkPipelineStack(app, 'MyTestStack2', {
        accountRegionDeploymentMapping,
        synth,
        synthUsesDocker,

      });
    }).not.toThrowError(/Cannot use synthUsesDocker without a custom synth prop/);
  });

  it('Requires a way to iterate stages', () => {
    const app = new cdk.App();
    // WHEN
    expect(() => {
      new SelfUpdatingCdkPipelineStack(app, 'MyTestStack', {
        accountRegionDeploymentMapping,
        inputSource,
      });
    }).toThrowError(/At least one Stage \(application\/collection of Stacks\) is needed, either through stages prop or stageHelperFunction/);

    expect(() => {
      new SelfUpdatingCdkPipelineStack(app, 'MyTestStack2', {
        accountRegionDeploymentMapping,
        inputSource,
        stageHelperFunction: ((stage) => {
          new cdk.Stack(stage, 'TestStack2');
          new cdk.Stack(stage, 'TestStack3');
        }),
      });
    }).not.toThrow();

    expect(() => {
      new SelfUpdatingCdkPipelineStack(app, 'MyTestStack3', {
        accountRegionDeploymentMapping,
        inputSource,
        stages: [{
          stageClass: StageWithGenerator,
          stageProps: {
            generator: ((stage: StageWithGenerator) => {
              new cdk.Stack(stage, 'TestStack2');
              new cdk.Stack(stage, 'TestStack3');
            }),
          },
        }],
      });
    }).not.toThrow();
  });

  it('Generates the anticipated resources', () => {
    const app = new cdk.App();

    // when running template the below will happen if env isn't set
    // Pipeline stack which uses cross-environment actions must have an explicitly set region
    // You need to specify an explicit account when using CodePipeline's cross-region support
    const stack = new SelfUpdatingCdkPipelineStack(app, 'MyTestStack', {
      accountRegionDeploymentMapping,
      inputSource,
      env: {
        account: 'abc123',
        region: 'us-west-2',
      },
      stages: [{
        stageClass: StageWithGenerator,
        stageProps: {
          generator: ((stage: StageWithGenerator) => {
            new cdk.Stack(stage, 'TestStack2');
            new cdk.Stack(stage, 'TestStack3');
          }),
        },
      }],
    });

    const template = Template.fromStack(stack);

    // uses an artifact bucket
    template.resourceCountIs('AWS::S3::Bucket', 1);
    // with a policy
    template.resourceCountIs('AWS::S3::BucketPolicy', 1);
    // pipeline
    template.resourceCountIs('AWS::CodePipeline::Pipeline', 1);
    // a webhook for the source
    template.resourceCountIs('AWS::CodePipeline::Webhook', 1);
    // a codebuild project for synth of pipeline and actual project
    template.resourceCountIs('AWS::CodeBuild::Project', 2);
  });
});
