# happy-js-cli

Simple Typescript Starter CLI with evergreen start - it should use the latest generators of each type as they update, and uses large enough projects that, in theory it should update fine. However, should that not be the case we will attempt to freeze when brought to our attention, add a note to the TODOs/Discussions at the bottom of this document, and revisit at a later date.

## To Use

- Latest (potentially unstable) commit - `npx HappyFunCorp/HFC_JS_SEED`;
- Latest release - `npx HappyFunCorp/HFC_JS_SEED#release`

### Alternative

You may also download this repo, then use `npm install` and `npm link` to enable using `hfc` command directly.

## Should be able to generate

### Base Projects

- React (CRA)
- NextJS
- Opinionated Express through NestJS Framework
- Node
- Electron (Desktop Apps) - with React and IPC(Inter Process Communication) Helpers
- Expo (React Native Mobile Apps)

#### UI Libraries Additional Options

These are available via direct input, or the questions after - note that you should only select one at a time and we don't currently force that.

- [Tailwind](https://tailwindcss.com/) - [NativeWind](https://www.nativewind.dev/) for React Native
- [Material UI (MUI)](https://mui.com/material-ui/getting-started/overview/)
- [Chakra UI](https://chakra-ui.com/)

#### What is included

- Storybook for UI projects
- ESLint rules (Airbnb)
- Default Readme
- Docker Support (except Electron and Expo, as those are cross platform development minded)

### Components

Components for the structure depending upon the component. Readme files in each project will give brief reason for file or folder existing at each level at the start.

#### Component Structure

ComponentName/readme.md - A readme file
ComponentName/index.ts - Exports the base component of ComponentName
ComponentName/ComponentName.ts - Actual Component
ComponentName/ComponentName.test.ts - Tests for the component
ComponentName/ComponentName.stories.ts - Storybook stories (for UI only).
ComponentName/util/ - Utility/extra functions or sub components can go here.

## Files/Folders

- [node_modules/](https://docs.npmjs.com/cli/v9/configuring-npm/folders) - Standard node module install location.
- [resources/](resources/readme.md) - Resources used for this project to help generate the other projects - template files.
- [util/](util/readme.md) - Utility files utilized by this project.
- [.gitignore](https://git-scm.com/docs/gitignore) - Files to ignore when checking into source system.
- index.js - The entrypoint to this CLI module.
- [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) - Describes project, including dependencies, scripts, ect. A good starting point when looking at any node project.
- [yarn.lock](https://classic.yarnpkg.com/lang/en/docs/yarn-lock/) - Standard yarn lock file to tell exact dependencies installed.

## Code Structure

A command-line interface (CLI) script that generates a project based on customizable generator templates.

### Imports

- `zx` module: provides terminal process related utilities.
- `arg` module: parses command line arguments.
- `inquirer` module: prompts questions in the command-line interface.
- `getPrioritizedGenerators` module: provides prioritized list of generators.
- `playHook` module: triggers hook functions in the generators.

### Variables

- `generators`: prioritized list of generators obtained from `getPrioritizedGenerators` module.
- `baseDirectory`: the directory of the script.
- `optionDescriptions`: an object that stores descriptions for CLI options.
- `usage`: the usage message displayed to the user.
- `argFields`: an object that maps command line options to their expected types.
- `args`: an object that holds the parsed command line arguments.
- `options`: an object that holds the processed options, including the `relativeDirectory` option.
- `questions`: an array of question objects to be prompted to the user.
- `optionValues`: an object that holds the values of options, including the values obtained from prompts.

### Main Flow

1. The `cliOptionDescriptions` hook is triggered in the generators, providing them with `optionDescriptions`.
2. The `cliOptionDescriptions` hook populates `optionDescriptions`.
3. The `cliArgFields` hook is triggered in the generators, providing them with `argFields`.
4. The `cliArgFields` hook populates `argFields`.
5. The parsed command line arguments are stored in `args` using `arg(argFields, usage)`.
6. The `cliOptions` hook is triggered in the generators, providing them with `options` and `args`.
7. The `cliOptions` hook processes `options`.
8. If the `--help` or `-h` options are present in `args`, the usage message is displayed and the script exits.
9. The `promptQuestions` hook is triggered in the generators, providing them with `questions`, `options`, and `args`.
10. The `questions` are prompted to the user and the results are stored in `optionValues`.
11. The `boilerplate` hook is triggered in the generators, providing them with `baseDirectory` and `optionValues`.
12. The script changes to the relative directory of the project.
13. The `installDeps` hook is triggered in the generators, providing them with `baseDirectory` and `optionValues`.
14. The script changes to the parent directory of the project.
15. The `updateGlobalFiles` hook is triggered in the generators, providing them with `baseDirectory` and `optionValues`.
16. The script changes back to the relative directory of the project.
17. The `updateLocalFiles` hook is triggered in the generators, providing them with `baseDirectory` and `optionValues`.
18. The `postGenerate` hook is triggered in the generators, providing them with `baseDirectory` and `optionValues`.
19. Finally, the process exits with status 0.

### Explanation of the code

This script is a command line interface (CLI) tool that uses various hooks provided by generators to create a project using the specified generator.
The generators are prioritized using getPrioritizedGenerators function and passed as an argument to the playHook function.

The following hooks are used in the script:

- `cliOptionDescriptions`: used to get the descriptions of the CLI options from the generators.
- `cliArgFields`: used to get the argument fields from the generators.
- `cliOptions`: used to get the options from the generators.
- `promptQuestions`: used to get the questions to be prompted from the generators.
- `boilerplate`: used to generate the project boilerplate from the generators.
- `installDeps`: used to install the dependencies from the generators.
- `updateGlobalFiles`: used to update the global files from the generated project.
- `updateLocalFiles`: used to update the local files from the generated project.
- `updateAllFiles`: used in place of updateGlobal/LocalFiles for newer generators.
- `postGenerate`: used to perform any post-generation tasks from the generators.

The `optionValues` object is created by merging the options object with the answers to the questions prompted using inquirer.prompt.
The `optionValues` object is then passed along with the baseDirectory to the hooks.

## Manually Run Commands Yourself (escape the generator process, but keep the general structure)

While the hope is that you won't need to do this, it can make for a good learning experience as well as verification that things are what you think. The simplest process to do this would be to go to the [generators/](generators/readme.md) folder, then navigate to the generator you care about and read through the hooks from top to bottom. Note that the `.definition.js` files have information that generally makes it easier to see what the dependencies outside of the airbnb typescript and storybook are.

## TODOs/Discussions

- At time of this writing [Next.js has a beta app directory structure](https://beta.nextjs.org/docs/upgrade-guide#migrating-from-pages-to-app) that is not yet recommended for production. We should revisit this structure once it is the recommended way.
- Convert the CLI code to TypeScript to implement a strict generator interface
- Enhance tool support by implementing additional generators
- For electron, `svgr/webpack` had to be frozen at `6.5.1` for the storybook bits to work. 7.0 was having issues.