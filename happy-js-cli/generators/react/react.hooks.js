import { $ as terminalProcess, fs } from 'zx';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import definition from './react.definition.js';

import generateOptionDescriptions from '../../util/generateOptionDescriptions.js';
import generateCliArgTypes from '../../util/generateCliArgTypes/index.js';
import generateCliArgValues from '../../util/generateCliArgValues.js';
import generatePromptQuestions from '../../util/generatePromptQuestions.js';
import deleteProjectFiles from '../../util/deleteProjectFiles.js';

import cliArgDefinition from './react.cliArgDefinition.js';
import updateJsonFile from '../../util/updateJsonFile/updateJsonFile.js';

const thisDir = dirname(fileURLToPath(import.meta.url));

function shouldRun({ projectType }) {
  return projectType === Object.values(cliArgDefinition)[0].description;
}

export default function getHooks() {
  return {
    priorityIndex: 100,
    cliOptionDescriptions: (params) => generateOptionDescriptions(params, cliArgDefinition),
    cliArgFields: (params) => generateCliArgTypes(params, cliArgDefinition),
    cliOptions: (params) => generateCliArgValues(params, cliArgDefinition),
    promptQuestions: (params) => generatePromptQuestions(params, cliArgDefinition),
    async boilerplate({ optionValues }) {
      if (!shouldRun(optionValues)) {
        return;
      }
      const { relativeDirectory } = optionValues;
      // create app, install the basics
      await terminalProcess`npx create-react-app@latest ${relativeDirectory} --template typescript`;
    },
    async installDeps({ optionValues }) {
      if (!shouldRun(optionValues)) {
        return;
      }
      // using npm because of caching issue with one of the packages in yarn...
      // filename ends up too long locally
      await terminalProcess`npx storybook@latest init --package-manager=npm`;
      await terminalProcess`npx install-peerdeps --dev eslint-config-airbnb`;
      await terminalProcess`npm install ${definition.devDependencies} --save-dev`;
      await terminalProcess`npm install ${definition.dependencies}`;
    },
    async updateAllFiles(params) {
      const {
        finalDirectory,
        optionValues,
      } = params;
      if (!shouldRun(optionValues)) {
        return;
      }

      // remove extra files
      deleteProjectFiles(finalDirectory, definition.removeFiles);

      await updateJsonFile(join(finalDirectory, 'tsconfig.json'), (jsonIn) => {
        const tsconfig = jsonIn;
        tsconfig.include.push('.storybook');
      });

      // copy new files
      await fs.copy(
        join(thisDir, 'assets'),
        finalDirectory,
        { overwrite: true },
      );

      await fs.copy(
        join(finalDirectory, '.env.example'),
        join(finalDirectory, '.env'),
        { overwrite: true },
      );
    },
    async updatePackageJson({ optionValues, finalDirectory }) {
      if (!shouldRun(optionValues)) {
        return;
      }

      await updateJsonFile(join(finalDirectory, 'package.json'), (jsonIn) => {
        const packageJSON = jsonIn;
        delete packageJSON.eslintConfig;
        packageJSON.scripts = {
          ...packageJSON.scripts,
          lint: 'eslint src/**/*.{js,jsx,ts,tsx}',
          'lint-fix': 'eslint src/**/*.{js,jsx,ts,tsx} --fix',
          build: `${packageJSON.scripts.build} && npx react-inject-env set`,
          dev: 'concurrently "npm:start" "npm:storybook"',
          // e2e: 'npx playwright test',
        };
        // packageJSON.dependencies["prop-types"] =
        //   packageJSON.devDependencies["prop-types"];
        // delete packageJSON.devDependencies["prop-types"];
      });
    },
    async postGenerate({ optionValues, finalDirectory }) {
      if (!shouldRun(optionValues)) {
        return;
      }

      // update the index.html
      const indexHTMLFile = join(finalDirectory, 'public/index.html');
      let indexHTML = await fs.readFile(indexHTMLFile, 'utf8');
      indexHTML = indexHTML.replace(
        '</head>',
        '<script src="/env.js"></script></head>',
      );
      await fs.writeFile(indexHTMLFile, indexHTML);

      // update .gitignore
      const gitIgnoreFile = join(thisDir, '.gitignore');
      await fs.appendFile(gitIgnoreFile, '\n.env');

      // fix linting now that files are all there, to the best of our abilities
      await terminalProcess`npm run lint-fix`;
    },
  };
}
