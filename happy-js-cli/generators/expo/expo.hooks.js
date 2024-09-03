import { $ as terminalProcess, fs } from 'zx';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import generateOptionDescriptions from '../../util/generateOptionDescriptions.js';
import generateCliArgTypes from '../../util/generateCliArgTypes/index.js';
import generateCliArgValues from '../../util/generateCliArgValues.js';
import generatePromptQuestions from '../../util/generatePromptQuestions.js';
import deleteProjectFiles from '../../util/deleteProjectFiles.js';

import updateJsonFile from '../../util/updateJsonFile/index.js';

import cliArgDefinition from './expo.cliArgDefinition.js';

import definition from './expo.definition.js';

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
    async boilerplate({ optionValues }) {
      if (!shouldRun(optionValues)) {
        return;
      }

      const { relativeDirectory } = optionValues;

      await terminalProcess`npx create-expo-app@latest --template expo-template-storybook ${relativeDirectory}`;
    },
    async installDeps({ optionValues, finalDirectory }) {
      if (!shouldRun(optionValues)) {
        return;
      }

      await terminalProcess`npx install-peerdeps --dev eslint-config-airbnb`;

      const packageJson = await fs.readJsonSync(join(finalDirectory, 'package.json'));
      // react test renderer will need to be at same version as react in deps
      const reactVersion = packageJson.dependencies.react;

      // react-native-web@${reactVersion}
      await terminalProcess`npm install react-test-renderer@${reactVersion} ${definition.devDependencies} --save-dev`;
      await terminalProcess`npx expo install ${definition.dependencies}`;
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

      deleteProjectFiles(finalDirectory, definition.removeFiles);

      // copy new files
      await fs.copy(
        join(thisDir, 'assets'),
        finalDirectory,
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
          start: 'cross-env NODE_OPTIONS=--openssl-legacy-provider expo start',
          web: 'cross-env NODE_OPTIONS=--openssl-legacy-provider expo start --web',
          lint: 'eslint **/*.{js,jsx,ts,tsx}',
          'lint-fix': 'eslint **/*.{js,jsx,ts,tsx} --fix',
          test: 'jest',
          storybook: 'sb-rn-get-stories --config-path .ondevice && cross-env STORYBOOK_ENABLED=true expo start',
          'storybook:ios': 'sb-rn-get-stories --config-path .ondevice && cross-env STORYBOOK_ENABLED=true expo start --ios',
          'storybook:android': 'sb-rn-get-stories --config-path .ondevice && cross-env STORYBOOK_ENABLED=true expo start --android',
          'export-web': 'cross-env NODE_OPTIONS=--openssl-legacy-provider expo export:web',
        };
      });
    },
    async postGenerate({ optionValues, finalDirectory }) {
      if (!shouldRun(optionValues)) {
        return;
      }

      const gitIgnoreFile = join(finalDirectory, '.gitignore');
      await fs.appendFile(gitIgnoreFile, '\nstorybook-static/');

      await terminalProcess`npm run lint-fix`;
    },
  };
}
