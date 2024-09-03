import { $ as terminalProcess, fs } from 'zx';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import generateOptionDescriptions from '../../util/generateOptionDescriptions.js';
import generateCliArgTypes from '../../util/generateCliArgTypes/index.js';
import generateCliArgValues from '../../util/generateCliArgValues.js';
import generatePromptQuestions from '../../util/generatePromptQuestions.js';
import deleteProjectFiles from '../../util/deleteProjectFiles.js';

import updateJsonFile from '../../util/updateJsonFile/index.js';

import cliArgDefinition from './electron.cliArgDefinition.js';

import definition from './electron.definition.js';

const thisDir = dirname(fileURLToPath(import.meta.url));

function shouldRun({ projectType }) {
  return projectType === Object.values(cliArgDefinition)[0].description;
}

export default function getHooks() {
  return {
    priorityIndex: 90,
    cliOptionDescriptions: (params) => generateOptionDescriptions(params, cliArgDefinition),
    cliArgFields: (params) => generateCliArgTypes(params, cliArgDefinition),
    cliOptions: (params) => generateCliArgValues(params, cliArgDefinition),
    promptQuestions: (params) => generatePromptQuestions(params, cliArgDefinition),
    async boilerplate({ optionValues, finalDirectory }) {
      if (!shouldRun(optionValues)) {
        return;
      }

      const { relativeDirectory } = optionValues;

      await terminalProcess`npm init electron-app@latest ${relativeDirectory} -- --template=webpack-typescript`;

      deleteProjectFiles(finalDirectory, ['yarn.lock']);
    },
    async installDeps({ optionValues }) {
      if (!shouldRun(optionValues)) {
        return;
      }

      await terminalProcess`npx install-peerdeps --dev eslint-config-airbnb`;

      await terminalProcess`npm install ${definition.devDependencies} --save-dev`;
      await terminalProcess`npm install ${definition.dependencies} --save`;
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

      // copy new files
      await fs.copy(
        join(thisDir, 'assets'),
        finalDirectory,
        { overwrite: true },
      );

      // for the questions this needs to run after the copying files
      await terminalProcess`npx storybook@latest init --package-manager=npm --type=react`;
      deleteProjectFiles(finalDirectory, definition.removeFiles);

      await fs.copy(
        join(thisDir, 'assets', '.storybook'),
        join(finalDirectory, '.storybook'),
        { overwrite: true },
      );
    },
    async updatePackageJson({ optionValues, finalDirectory }) {
      if (!shouldRun(optionValues)) {
        return;
      }

      await updateJsonFile(join(finalDirectory, 'package.json'), (jsonIn) => {
        const packageJSON = jsonIn;
        packageJSON.scripts = {
          ...packageJSON.scripts,
          generateElectronegativity: 'npx electronegativity -i out -o out/electronegativityResults.csv',
          lint: 'eslint --ext .ts,.tsx,.js,.jsx .',
          'lint-fix': 'eslint --ext .ts,.tsx,.js,.jsx . --fix',
          test: 'jest',
          'test-e2e': 'playwright test',
          'test-full': 'npm run package && jest && playwright test',
          storybook: 'storybook dev -p 6006 --no-open',
          dev: 'cross-env INCLUDE_STORYBOOK_WINDOW=true concurrently "npm run storybook" "npm run start" --kill-others',
        };
      });
    },
    async postGenerate({ optionValues }) {
      if (!shouldRun(optionValues)) {
        return;
      }

      await terminalProcess`npm run lint-fix`;
    },
  };
}
