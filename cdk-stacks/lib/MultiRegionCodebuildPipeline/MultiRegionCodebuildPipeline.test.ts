import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import MultiRegionCodebuildPipeline from './MultiRegionCodebuildPipeline';

describe('MultiRegionCodebuild', () => {
  it('Should have expected resources', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new cdk.Stack(app, 'MyBaseStack');

    new MultiRegionCodebuildPipeline(stack, 'MyMultiRegionCodebuild');
    // THEN
    const template = Template.fromStack(stack);
  });
});
