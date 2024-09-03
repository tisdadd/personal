import { PluginBase } from '@electron-forge/plugin-base';
import { ForgeMultiHookMap } from '@electron-forge/shared-types';

class RunGeneratorScript extends PluginBase<unknown> {
  name = 'RunGeneratorScript';

  // eslint-disable-next-line class-methods-use-this
  getHooks(): ForgeMultiHookMap {
    return {
      generateAssets: [async () => {
        await import('../ipc/generateIpcRegistrationScript');
      }],
    };
  }
}

export default RunGeneratorScript;
