import { $ as terminalProcess, fs } from 'zx';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import generateOptionDescriptions from '../../util/generateOptionDescriptions.js';
import generateCliArgTypes from '../../util/generateCliArgTypes/index.js';
import generateCliArgValues from '../../util/generateCliArgValues.js';
import generatePromptQuestions from '../../util/generatePromptQuestions.js';
import deleteProjectFiles from '../../util/deleteProjectFiles.js';
import definition from './nest.definition.js';
import cliArgDefinition from './nest.cliArgDefinition.js';
import updateJsonFile from '../../util/updateJsonFile/updateJsonFile.js';

const thisDir = dirname(fileURLToPath(import.meta.url));

export default function getHooks() {
  return {
    priorityIndex: 80,
    cliOptionDescriptions: (params) => generateOptionDescriptions(params, cliArgDefinition),
    cliArgFields: (params) => generateCliArgTypes(params, cliArgDefinition),
    cliOptions: (params) => generateCliArgValues(params, cliArgDefinition),
    promptQuestions: (params) => generatePromptQuestions(params, cliArgDefinition),
    async boilerplate({ optionValues: { relativeDirectory, projectType } }) {
      if (projectType !== 'NestJS') {
        return;
      }

      // create app, install the basics
      await terminalProcess`npx @nestjs/cli@latest new ${relativeDirectory} --package-manager npm`;
    },
    async installDeps({ optionValues: { projectType } }) {
      if (projectType !== 'NestJS') {
        return;
      }

      await terminalProcess`npx install-peerdeps --dev eslint-config-airbnb-base`;
      await terminalProcess`npm install ${definition.devDependencies} --save-dev`;
      await terminalProcess`npm install ${definition.dependencies} --save`;
    },
    async updateAllFiles({
      finalDirectory,
      optionValues: { projectType },
    }) {
      if (projectType !== 'NestJS') {
        return;
      }

      // copy new files
      await fs.copy(
        join(thisDir, 'assets'),
        finalDirectory,
        { overwrite: true },
      );

      // remove extra files
      await deleteProjectFiles(finalDirectory, definition.removeFiles);
    },
    async updatePackageJson({ finalDirectory, optionValues: { projectType } }) {
      if (projectType !== 'NestJS') {
        return;
      }

      // update package.json
      updateJsonFile(join(finalDirectory, 'package.json'), (jsonIn) => {
        const packageJSON = jsonIn;
        packageJSON.scripts.generate = 'nest generate --';
        packageJSON.scripts['start:static'] = packageJSON.scripts.start;
        packageJSON.scripts.start = packageJSON.scripts['start:debug'];
      });
    },
    async postGenerate({
      finalDirectory,
      optionValues: {
        projectType, apiName, apiDescription, apiTag,
      },
    }) {
      if (projectType !== 'NestJS') {
        return;
      }

      // update nest-cli.json
      const cliFile = join(process.cwd(), 'nest-cli.json');

      updateJsonFile(join(finalDirectory, 'nest-cli.json'), (jsonIn) => {
        const cliJSON = jsonIn;
        cliJSON.compilerOptions.plugins = ['@nestjs/swagger'];
      });

      // update main.ts
      const mainFile = join(finalDirectory, 'src', 'main.ts');
      const mainText = (await fs.readFile(mainFile, 'utf8'))
        .replace('API_TITLE', apiName)
        .replace('API_DESCRIPTION', apiDescription)
        .replace('API_TAG', apiTag);
      await fs.writeFile(mainFile, mainText);

      // update .gitignore
      const gitIgnoreFile = join(finalDirectory, '.gitignore');
      await fs.appendFile(gitIgnoreFile, '\n.env');

      // fix linting now that files are all there, to the best of our abilities
      await terminalProcess`npm run lint`;
    },
  };
}
