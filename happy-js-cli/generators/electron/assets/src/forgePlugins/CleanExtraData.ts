// in this file, we are specifically working with generated file names
/* eslint-disable security/detect-non-literal-fs-filename */
import { PluginBase } from '@electron-forge/plugin-base';
import { ForgeMultiHookMap } from '@electron-forge/shared-types';

import fs from 'fs';
import { join } from 'path';
import walk from 'walkdir';

class CleanExtraData extends PluginBase<unknown> {
  name = 'CleanExtraData';

  // eslint-disable-next-line class-methods-use-this
  getHooks(): ForgeMultiHookMap {
    return {
      postPackage: [async (forgeConfig, { outputPaths }) => {
        outputPaths.forEach((outputPath) => {
          const appJsPath = join(outputPath, 'resources/app');

          walk.sync(appJsPath, { no_recurse: true }, (path) => {
            if (path.endsWith('.webpack') || path.endsWith('package.json') || path.endsWith('.data')) {
              return;
            }
            if (fs.lstatSync(path).isDirectory()) {
              fs.rmSync(path, { recursive: true });
            } else {
              fs.rmSync(path);
            }
          });
        });
      }],
    };
  }
}

export default CleanExtraData;
