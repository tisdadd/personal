import { Stage } from 'aws-cdk-lib';
import OutputMap from './OutputMap.type';

type GeneratorFunction = (stage: Stage)=> OutputMap | void;

export default GeneratorFunction;
