import { $ as terminalProcess, fs } from 'zx';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import generateOptionDescriptions from '../../util/generateOptionDescriptions.js';
import generateCliArgTypes from '../../util/generateCliArgTypes/index.js';
import generateCliArgValues from '../../util/generateCliArgValues.js';
import generatePromptQuestions from '../../util/generatePromptQuestions.js';
import deleteProjectFiles from '../../util/deleteProjectFiles.js';

import cliArgDefinition from './chakra.cliArgDefinition.js';

import definition from './chakra.definition.js';

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

      await terminalProcess`npm install ${definition.dependencies} --save`;

      if (optionValues.projectType === 'Electron') {
        await terminalProcess`npm install typescript@latest --save-dev`;
      }
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

      // needs to happen before project specific files
      if (projectType === 'Electron') {
        // these files end up off by one level
        fs.copySync(
          join(finalDirectory, 'src', 'components'),
          join(finalDirectory, 'src', 'ui', 'components'),
          { overwrite: true },
        );
        fs.copySync(
          join(finalDirectory, 'src', 'views'),
          join(finalDirectory, 'src', 'ui', 'views'),
          { overwrite: true },
        );
        deleteProjectFiles(finalDirectory, ['src/views',
          'src/components']);
      }

      const projectTypeSpecificDirectory = join(thisDir, 'assets', projectType);
      if (fs.existsSync(projectTypeSpecificDirectory)) {
        await fs.copy(
          projectTypeSpecificDirectory,
          finalDirectory,
          { overwrite: true },
        );
      }

      if (projectType === 'NextJS') {
        const toRemove = ['src/components/navItems.tsx',
          'src/views/DefaultReactView'];
        if (fs.existsSync(join(finalDirectory, 'src', 'pages'))) {
          // using src directory instead of root
          fs.copySync(
            join(finalDirectory, 'pages'),
            join(finalDirectory, 'src', 'pages'),
            { recursive: true },
          );
          toRemove.push('pages');
        }
        deleteProjectFiles(finalDirectory, toRemove);
      }
    },
  };
}
