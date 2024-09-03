import { $ as terminalProcess, fs } from 'zx';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import generateOptionDescriptions from '../../util/generateOptionDescriptions.js';
import generateCliArgTypes from '../../util/generateCliArgTypes/index.js';
import generateCliArgValues from '../../util/generateCliArgValues.js';
import generatePromptQuestions from '../../util/generatePromptQuestions.js';

import cliArgDefinition from './tailwind.cliArgDefinition.js';

import definition from './tailwind.definition.js';
import nextJsCleanup from './util/nextJsCleanup.js';
import reactCleanup from './util/reactCleanup.js';
import electronCleanup from './util/electronCleanup.js';
import expoCleanup from './util/expoCleanup.js';

const thisDir = dirname(fileURLToPath(import.meta.url));

function shouldRun(optionValues) {
  return optionValues[Object.values(cliArgDefinition)[0].normalizedName];
}

export default function getHooks() {
  return {
    priorityIndex: 15,
    cliOptionDescriptions: (params) => generateOptionDescriptions(params, cliArgDefinition),
    cliArgFields: (params) => generateCliArgTypes(params, cliArgDefinition),
    cliOptions: (params) => generateCliArgValues(params, cliArgDefinition),
    promptQuestions: (params) => generatePromptQuestions(params, cliArgDefinition),
    async installDeps({ optionValues }) {
      if (!shouldRun(optionValues)) {
        return;
      }

      if (optionValues.projectType === 'Expo') {
        await terminalProcess`npx expo install nativewind tailwindcss postcss`;
      } else {
        await terminalProcess`npm install ${definition.devDependencies} --save-dev`;
      }

      if (optionValues.projectType === 'Electron') {
        await terminalProcess`npm install postcss-loader --save-dev`;
      }

      await terminalProcess`npx tailwindcss init -p`;
    },
    async updateAllFiles(
      params,
    ) {
      const {
        finalDirectory,
        optionValues,
      } = params;
      if (!shouldRun(optionValues)) {
        return;
      }

      const { projectType } = optionValues;

      // copy new files
      await fs.copy(
        join(thisDir, 'assets', 'base'),
        finalDirectory,
        { overwrite: true },
      );

      const projectTypeSpecificDirectory = join(thisDir, 'assets', projectType);
      if (fs.existsSync(projectTypeSpecificDirectory)) {
        await fs.copy(
          projectTypeSpecificDirectory,
          finalDirectory,
          { overwrite: true },
        );
      }

      switch (projectType) {
        case 'NextJS':
          await nextJsCleanup(params);
          break;
        case 'React':
          await reactCleanup(params);
          break;
        case 'Electron':
          await electronCleanup(params);
          break;
        case 'Expo':
          await expoCleanup(params);
          break;
        default: // do nothing
      }
    },
  };
}
