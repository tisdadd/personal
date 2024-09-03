import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import OutputMap from './OutputMap.type';
import GeneratorFunction from './GeneratorFunction.type';

interface StageWithGeneratorProps extends StageProps {
  generator: GeneratorFunction
}

class StageWithGenerator extends Stage {
  public readonly output: OutputMap;

  constructor(scope: Construct, id: string, props: StageWithGeneratorProps) {
    super(scope, id, props);
    this.output = {};

    const generatorOutput = props.generator(this);
    if (generatorOutput) {
      this.output = { ...this.output, ...generatorOutput };
    }
  }
}

export default StageWithGenerator;
