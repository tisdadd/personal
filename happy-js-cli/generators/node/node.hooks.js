import { $ as terminalProcess, fs } from 'zx';
import { join } from 'path';
import jsonFormat from 'json-format';
import generateOptionDescriptions from '../../util/generateOptionDescriptions.js';
import generateCliArgTypes from '../../util/generateCliArgTypes/index.js';
import generateCliArgValues from '../../util/generateCliArgValues.js';
import generatePromptQuestions from '../../util/generatePromptQuestions.js';

import definition from './node.definition.js';
import cliArgDefinition from './node.cliArgDefinition.js';

function shouldRun({ projectType }) {
  return projectType === Object.values(cliArgDefinition)[0].description;
}

export default function getHooks() {
  return {
    priorityIndex: 70,
    cliOptionDescriptions: (params) => generateOptionDescriptions(params, cliArgDefinition),
    cliArgFields: (params) => generateCliArgTypes(params, cliArgDefinition),
    cliOptions: (params) => generateCliArgValues(params, cliArgDefinition),
    promptQuestions: (params) => generatePromptQuestions(params, cliArgDefinition),
    async boilerplate({ optionValues: { relativeDirectory, projectType } }) {
      if (projectType !== 'Node') {
        return;
      }

      const projectDirectory = join(process.cwd(), relativeDirectory);
      // check if directory exists
      if (fs.existsSync(projectDirectory)) {
        throw new Error(`${relativeDirectory} exists`);
      }

      // create and go to directory
      fs.mkdirSync(projectDirectory);
    },
    async installDeps({ optionValues: { projectType } }) {
      if (projectType !== 'Node') {
        return;
      }

      // init project
      await terminalProcess`npm init -y`;
      // install dependencies
      await terminalProcess`npx install-peerdeps --dev eslint-config-airbnb-base`;
      await terminalProcess`npm install ${definition.devDependencies} --save-dev`;
    },
    async updateGlobalFiles({
      baseDirectory,
      optionValues: { relativeDirectory, projectType },
    }) {
      if (projectType !== 'Node') {
        return;
      }

      // copy new files
      await fs.copy(
        join(baseDirectory, '/generators/node/assets'),
        join(process.cwd(), relativeDirectory),
        { overwrite: true },
      );
    },
    async updateLocalFiles({ optionValues: { projectType } }) {
      if (projectType !== 'Node') {
        // return
      }

      // await fs.copy(
      //   join(process.cwd(), '.env.example'),
      //   join(process.cwd(), '.env.local'),
      //   { overwrite: true },
      // );
    },
    async updatePackageJson({ optionValues: { projectType } }) {
      if (projectType !== 'Node') {
        return;
      }

      // update package.json
      const packageFile = join(process.cwd(), 'package.json');
      const packageJSON = await fs.readJSON(packageFile);
      packageJSON.scripts = {
        dev: 'nodemon',
        build: 'rimraf ./dist && tsc',
        lint: 'eslint **/*.{js,jsx,ts,tsx}',
        'lint-fix': 'eslint **/**.{js,jsx,ts,tsx} --fix',
        start: 'npm run build && npm run run-build',
        'run-build': 'node dist/index.js',
        test: 'jest',
      };
      packageJSON.main = 'index.ts';
      await fs.writeFile(
        packageFile,
        jsonFormat(packageJSON, { type: 'space' }),
      );
    },
    async postGenerate({ optionValues: { projectType } }) {
      if (projectType !== 'Node') {
        return;
      }

      // fix linting now that files are all there, to the best of our abilities
      await terminalProcess`npm run lint-fix`;
    },
  };
}
