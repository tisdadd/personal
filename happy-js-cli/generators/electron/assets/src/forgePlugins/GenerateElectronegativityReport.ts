import { PluginBase } from '@electron-forge/plugin-base';

import { exec } from 'child_process';

import { join } from 'path';

class CleanExtraData extends PluginBase<unknown> {
  name = 'GenerateElectronegativityReport';

  // eslint-disable-next-line class-methods-use-this
  getHooks() {
    return {
      postPackage: [async () => {
        const runScript = new Promise<void>((resolve, reject) => {
          exec(
            `cd ${join(__dirname, '../..')} && npm run generateElectronegativity`,
            (error, stdout, stderr) => {
              if (error) {
                reject(error);
                return;
              }
              if (stderr) {
                reject(error);
                return;
              }
              resolve();
            },
          );
        });
        await runScript;
      }],
    };
  }
}

export default CleanExtraData;
