#! /usr/bin/env node

/* without the file extensions, get a cannot find module
error when running locally */

import { cd } from 'zx';
import arg from 'arg';
import inquirer from 'inquirer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import getPrioritizedGenerators from './util/getPrioritizedGenerators/index.js';
import playHook from './util/playHook/index.js';

const generators = getPrioritizedGenerators();

const baseDirectory = dirname(fileURLToPath(import.meta.url));

const optionDescriptions = {};

await playHook({
  generators,
  hook: 'cliOptionDescriptions',
  data: { optionDescriptions },
});

optionDescriptions['--relative-directory'] = 'Project Name (sub-directory)';
optionDescriptions['--help'] = '\tShow this message';

const usage = `
Usage:
${Object.entries(optionDescriptions)
    .map(([name, description]) => `  ${name}\t\t${description}`)
    .join('\n')}
`;

const argFields = {
  '--relative-directory': String,
  '--help': Boolean,
};

await playHook({ generators, hook: 'cliArgFields', data: { argFields } });

const args = arg(argFields, usage);

const options = {
  relativeDirectory: args['--relative-directory'] || 'sample-project',
};

await playHook({ generators, hook: 'cliOptions', data: { options, args } });

if (args['--help'] || args['-h']) {
  // we want to log the usage for users to see.
  /* eslint-disable-next-line no-console */
  console.log(usage);
  process.exit(0);
}

const questions = [
  {
    when: !args['--relative-directory'],
    name: 'relativeDirectory',
    message: 'Project Name (sub-directory)?',
    default: options.relativeDirectory,
  },
];

await playHook({
  generators,
  hook: 'promptQuestions',
  data: { questions, options, args },
});

const optionValues = {
  ...options,
  ...(await inquirer.prompt(questions)),
};

const data = {
  baseDirectory,
  optionValues,
  finalDirectory: join(process.cwd(), optionValues.relativeDirectory),
};

await playHook({
  generators,
  hook: 'boilerplate',
  data,
});

cd(optionValues.relativeDirectory);

await playHook({
  generators,
  hook: 'installDeps',
  data,
});

cd('..');

await playHook({
  generators,
  hook: 'updateGlobalFiles',
  data,
});

cd(optionValues.relativeDirectory);

await playHook({
  generators,
  hook: 'updateLocalFiles',
  data,
});

await playHook({
  generators,
  hook: 'updateAllFiles',
  data,
});

await playHook({
  generators,
  hook: 'updatePackageJson',
  data,
});

await playHook({
  generators,
  hook: 'postGenerate',
  data,
});

process.exit(0);
