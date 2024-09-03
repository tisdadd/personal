import {
  Stack, StackProps, Stage, StageProps,
} from 'aws-cdk-lib';
import {
  CodePipelineSource, CodePipeline, IFileSetProducer, CodeBuildStep, DockerCredential,
} from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import StageWithGenerator from './util/StageWithGenerator';
import GeneratorFunction from './util/StageWithGenerator/GeneratorFunction.type';

// need constructors that extend stage
type StageConstructor = new (...args: any[])=>Stage;

// for a PseudoStage...
type PseudoStage = {
  stageClass: StageConstructor,
  stageProps?: any
};

interface SelfUpdatingCdkPipelineStackProps extends StackProps {
  /**
   * Main input source
   */
  inputSource?: CodePipelineSource,
  /**
   * Location where the Cloud Development Kit (CDK) portion of the application lives
   * By default, the root of the inputSource
   */
  cdkLocation?: string,
  /**
   * Disable the self updating/mutating nature of this - useful for rapid development without
   * checking into git.
   */
  disableSelfUpdateForLocalDevelopment?: boolean,
  /**
   * Overrides the default built synth step.
   * Default is built for node npm stack, with the assumption that
   * the current working directory contains a package.json with the commands it will run.
   * If there is a package.json in the specified separate cdk directory,
   * it will run the commands there as well.
   * Also, if neither package includes aws-cdk then it will be installed as a global npm package.
   *
   * - npm install (should be done by default in root)
   * - npm ci
   * - npm build
   * - change to cdk directory
   * - npx cdk synth
   */
  synth?: IFileSetProducer,
  /**
   * Does the custom synth step use a docker image of some sort?
   */
  synthUsesDocker?: boolean,
  /**
   * Do the stacks use docker? Maybe for a lambda? Any sort of asset bundling?
   */
  stacksUseDocker?: boolean,
  /**
   * Credentials for docker to utilize if needed
   */
  dockerCredentials?: DockerCredential[],
  /**
   * Need more than one stage per environment? Use this.
   * Also, it will fill in scope and id, while taking your stage props passed
   */
  stages?: PseudoStage[],
  /**
   * Function to help with stages - gives just the StageWithGenerator to attach logic to.
   * For instance, (stage)=>{
   *  new Stack1(stage, 'Stack1', {})
   *  new Stack2(stage, 'Stack2', {})
   * }
   */
  stageHelperFunction?: GeneratorFunction
  /**
   * Account and Regions mapping
   * {
   *  [account]: [region-1, region-2]
   * }
   */
  accountRegionDeploymentMapping: {
    [key: string]: string[]
  }
}

class SelfUpdatingCdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: SelfUpdatingCdkPipelineStackProps) {
    super(scope, id, props);

    const {
      inputSource,
      cdkLocation = '',
      disableSelfUpdateForLocalDevelopment,
      synth: propsSynth,
      synthUsesDocker,
      stacksUseDocker,
      dockerCredentials,
      stages,
      stageHelperFunction,
      accountRegionDeploymentMapping,
    } = props;

    if (!propsSynth && !inputSource) {
      throw new Error('Prop inputSource is required without explicit synth prop');
    }
    if (!propsSynth && synthUsesDocker) {
      throw new Error('Cannot use synthUsesDocker without a custom synth prop');
    }

    if ((!stages || stages.length < 1) && !stageHelperFunction) {
      throw new Error('At least one Stage (application/collection of Stacks) is needed, either through stages prop or stageHelperFunction');
    }

    let synth = propsSynth;
    if (!synth) {
      const cwdPackageJsonPath = join(process.cwd(), 'package.json');

      let installCommands: string[] | undefined;
      const commands: string[] = [];
      let primaryOutputDirectory: string | undefined;

      if (existsSync(cwdPackageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(cwdPackageJsonPath, 'utf-8'));
        if (packageJson?.scripts?.ci) {
          commands.push('npm ci');
        }
        if (packageJson?.scripts?.build) {
          commands.push('npm build');
        }

        if (!cdkLocation
          && !packageJson?.dependencies['aws-cdk']
          && !packageJson?.devDependencies['aws-cdk']) {
          installCommands = ['npm install -g aws-cdk'];
        }
      }

      if (cdkLocation) {
        primaryOutputDirectory = `${cdkLocation}/cdk.out`;
        commands.push(`cd ${cdkLocation}`);
        const cdkJsonPath = join(process.cwd(), cdkLocation, 'package.json');
        // Developer given variable - should be safe, also forcing a package.json on it.
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        if (existsSync(cdkJsonPath)) {
          // Developer given variable - should be safe, also forcing a package.json on it.
        // eslint-disable-next-line security/detect-non-literal-fs-filename
          const packageJson = JSON.parse(readFileSync(cdkJsonPath, 'utf-8'));
          commands.push('npm install');
          if (packageJson?.scripts?.ci) {
            commands.push('npm ci');
          }
          if (packageJson?.scripts?.build) {
            commands.push('npm build');
          }

          if (!packageJson?.dependencies['aws-cdk']
            && !packageJson?.devDependencies['aws-cdk']) {
            installCommands = ['npm install -g aws-cdk'];
          }
        } else {
          installCommands = ['npm install -g aws-cdk'];
        }
      }

      synth = new CodeBuildStep('SynthStep', {
        input: inputSource,
        installCommands,
        commands,
        primaryOutputDirectory,
      });
    }

    // The code that defines your stack goes here
    const pipeline = new CodePipeline(this, 'Pipeline', {
      selfMutation: !disableSelfUpdateForLocalDevelopment,
      synth,
      dockerEnabledForSelfMutation: synthUsesDocker,
      dockerEnabledForSynth: stacksUseDocker,
      dockerCredentials,
    });

    Object.entries(accountRegionDeploymentMapping).forEach(([account, regions]) => {
      regions.forEach((region) => {
        // simple stage from function
        if (stageHelperFunction) {
          pipeline.addStage(new StageWithGenerator(this, `${account}-${region}-GeneratorStage`, {
            env: {
              account,
              region,
            },
            generator: stageHelperFunction,
          }));
        }

        // more complex stages that may need a bit more
        if (stages) {
          stages.forEach(({ stageClass: StageClass, stageProps }, index) => {
            pipeline.addStage(new StageClass(this, `${account}-${region}-Stage-${index}`, {
              ...stageProps,
              env: {
                ...stageProps?.env || {},
                account,
                region,
              },
            }));
          });
        }
      });
    });
  }
}

export default SelfUpdatingCdkPipelineStack;
