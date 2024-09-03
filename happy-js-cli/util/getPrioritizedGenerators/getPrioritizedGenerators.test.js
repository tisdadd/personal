import { jest } from '@jest/globals';

describe('getPrioritizedGenerators', () => {
  it('should return an array of prioritized generators', async () => {
    const generators = {
      generatorA: {
        priorityIndex: 100,
        installDeps: null,
        updateFiles: null,
        updatePackageJson: null,
      },
      generatorB: {
        priorityIndex: 200,
        installDeps: null,
        updateFiles: null,
        updatePackageJson: null,
      },
      generatorC: {
        priorityIndex: 50,
        installDeps: null,
        updateFiles: null,
        updatePackageJson: null,
      },
    };

    jest.unstable_mockModule('../../generators/index.js', () => ({
      default: () => generators,
    }));

    const {default: getPrioritizedGenerators} = await import(
      './getPrioritizedGenerators'
    );

    const prioritizedGenerators = getPrioritizedGenerators();

    expect(prioritizedGenerators).toHaveLength(3);
    expect(prioritizedGenerators[0].key).toBe('generatorB');
    expect(prioritizedGenerators[1].key).toBe('generatorA');
    expect(prioritizedGenerators[2].key).toBe('generatorC');
  });
});
