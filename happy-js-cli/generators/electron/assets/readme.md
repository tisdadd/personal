# Getting Started with HFC_JS_SEED Electron App

This project was bootstrapped with [HFC_JS_SEED](https://github.com/HappyFunCorp/HFC_JS_SEED) utilizing the [Electron Forge Webpack + Typescript Template](https://www.electronforge.io/templates/typescript-+-webpack-template), [Storybook](https://storybook.js.org/), [Jest testing](https://jestjs.io/), [Playwright e2e testing](https://playwright.dev/), and [Airbnb Typescript Linting](https://www.npmjs.com/package/eslint-config-airbnb-typescript) setup.

Please initialize through `npm install`.

## Available Scripts

- `npm run dev` - Starts the electron app and the storybook development server, opening windows to each.
- `npm run start` - Starts the electron app without storybook development server.
- `npm run lint` - Lints the project
- `npm run lint-fix` - Fixing linting where it can.
- `npm run package` - The package step in the [build lifecycle](https://www.electronforge.io/core-concepts/build-lifecycle).
- `npm run make` - The make step in the [build lifecycle](https://www.electronforge.io/core-concepts/build-lifecycle).
- `npm run publish` - The publish step in the [build lifecycle](https://www.electronforge.io/core-concepts/build-lifecycle).
- `npm run test` - Run the jest unit tests
- `npm run test-e2e` - Run playwright end to end tests
- `npm run test-full` - Run both jest and playwright end to end tests
- `npm run generateElectronegativity` - For use with `src/forgePlugins/GenerateElectronegativityReport.js` plugin. Shouldn't need to be manually called, but it is what is called because the actual electronegativity package doesn't play well.
- `npm run build-storybook` - Builds the static storybook content.

## Files/Folders

- [.fttemplates/](.fttemplates/readme.md) - Templates for use with VS Code [Folder Templates](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure) extension.
- [.storybook/](.storybook/readme.md) - The storybook configuration files.
- [.vscode/](.vscode/readme.md) - Files for use in Visual Studio Code.
- .webpack/ - Intermittent webpack files for the renderer and main processes.
- [e2e-tests/](e2e-tests/readme.md) - [Playwright](https://playwright.dev/) end to end tests go here.
- [jest/](jest/readme.md) - Extra (non-config) jest files go here.
- [node_modules/](https://docs.npmjs.com/cli/v9/configuring-npm/folders) - Standard node module install location.
- out/ - Output from various build steps ends up here.
- [src/](src/readme.md) - The main code for the application.
- [.eslintrc.json](https://eslint.org/docs/latest/user-guide/configuring/) - Configures eslint.
- [.gitignore](https://git-scm.com/docs/gitignore) - Files to ignore when checking into source system.
- [forge.config.js](https://www.electronforge.io/configuration) - The configuration file for electron forge.
- [jest.config.js](https://jestjs.io/docs/configuration) - The configuration file for jest.
- [playwright.config.ts](https://playwright.dev/docs/test-configuration) - The configuration file for playwright
- [package-lock.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json) - File giving full versions of things installed with npm, and their dependencies.
- [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) - Describes project, including dependencies, scripts, ect. A good starting point when looking at any node project.
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - Typescript configurations.
- [tsconfig.webpack.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - Typescript configurations for webpack packaging process only.
- [webpack.main.config.ts](https://webpack.js.org/configuration/) - Webpack configuration for the electron main process.]
- [webpack.plugins.ts](https://webpack.js.org/configuration/) - Webpack plugins for use in multiple packages.
- [webpack.renderer.config.ts](https://webpack.js.org/configuration/) - Webpack configuration for the electron renderer process.
- [webpack.rules.ts](https://webpack.js.org/configuration/) - Webpack rules for multiple configurations.

## FAQ

- Why is this readme.md instead of README.md?
  - All of the other files (config, ect) in the modern world no longer have the convention of all caps, and it helps to keep eyes from being drawn to this file instead of other, potentially more important files in the file tree.
- Why are readme.md files scattered around the repo?
  - For every file/folder that you create, it should be easy to have a reason behind it. This makes an easy way to document it. Additionally, you can place TODOs and easily parse it out into a readable format. Finally, it is meant to be easy navigation of documents straight in a git graphical interface (github, gitlab, ect). This allows a quick high level overview for newcomers curious about something, and also allows the component to be pulled off to its own module quickly if needed. 
- Why is @svgr/webpack at version 6.5.1 and hasn't updated to 7?
  - At the time of this writing, 7.0 had just released and produced an issue. Feel free to check if updating is safe or not.