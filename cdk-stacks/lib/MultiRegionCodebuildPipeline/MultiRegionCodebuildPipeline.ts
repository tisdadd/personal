import { Stack } from 'aws-cdk-lib';
import { Cache, LocalCacheMode, PipelineProject } from 'aws-cdk-lib/aws-codebuild';
import { Artifact, Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { Action, CodeBuildAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Construct } from 'constructs';

interface MultiRegionCodebuildProps {
  /**
   * The main region that the pipeline output will be deployed to.
   * Also the region that does the build.
   */
  mainRegion: string;
  /**
   * The regions that the pipeline output will be deployed to.
   */
  regions: string[];
  /**
   * The source action that will be used in the pipeline.
   */
  sourceAction: Action;
  /**
   * The environment variables that will be used in the build.
   */
  environmentVariables?: { [key: string]: string };
  /**
   * The deploy action generator that will be used to generate the deploy actions.
   * @param buildOutput The build output artifact.
   * @returns The deploy action.
   */
  deployActionGenerator: (buildOutput: Artifact) => Action;
}

/**
 * A construct that detects if it is in the main region,
 * builds a codebuild project in the main region using a pipeline, and then deploys to all other
 * regions along with the main region.
 */
class MultiRegionCodebuildPipeline extends Construct {
  constructor(scope: Construct, id: string, props?: MultiRegionCodebuildProps) {
    super(scope, id);

    const {
      mainRegion, regions, sourceAction, environmentVariables,
    } = props;
    // check if we are in the main region
    if (Stack.of(this).region === mainRegion) {
      const pipeline = new Pipeline(this, 'Pipeline');

      const sourceOutput = new Artifact();

      // add source stage
      pipeline.addStage({
        stageName: 'Source',
        actions: [sourceAction],
      });

      const pipelineProject = new PipelineProject(this, 'PipelineProject', {
        environment: {
          privileged: true,
        },
        environmentVariables,
        logging: {
          cloudWatch: {
            enabled: true,
          },
        },
        cache: Cache.local(
          LocalCacheMode.DOCKER_LAYER,
          LocalCacheMode.SOURCE,
          LocalCacheMode.CUSTOM,
        ),
      });

      const buildOutput = new Artifact();
      const buildAction = new CodeBuildAction({
        actionName: 'Build',
        project: pipelineProject,
        input: sourceOutput,
        outputs: [buildOutput],
      });

      // add build stage
      pipeline.addStage({
        stageName: 'Build',
        actions: [buildAction],
      });
    }
  }
}

export default MultiRegionCodebuildPipeline;
