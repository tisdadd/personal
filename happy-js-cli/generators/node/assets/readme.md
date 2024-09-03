# Getting Started with HFC_JS_SEED Node App

This is a simple, ready to use Typescript project with a small sample structure available, and template for VS Code [Folder Templates](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure) extension. Additionally, it allows [Jest testing](https://jestjs.io/) and utilizes [Airbnb Typescript Linting](https://www.npmjs.com/package/eslint-config-airbnb-typescript) setup.

## Available Scripts

- `npm run dev` - Starts up development mode (using [nodemon](https://www.npmjs.com/package/nodemon) for file watching)
- `npm start` - Build and run the build folder
- `npm run build` - Builds (compiles to javascript) the project in in a dist folder.
- `npm run run-build` - Runs just what is in the build folder.
- `npm run lint` - Lints the project
- `npm run lint-fix` - Fixing linting where it can.
- `npm run test` - Runs the jest unit tests in interactive watch mode.
- `npm run test:ci` - Runs the jest unit tests in non-interactive mode.

## Files/Folders

- [.fttemplates/](.fttemplates/readme.md) - Templates for use with VS Code [Folder Templates](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure) extension.
- dist/ - Compiled code is here
- [node_modules/](https://docs.npmjs.com/cli/v9/configuring-npm/folders) - Standard node module install location.
- [src/](src/readme.md) - The main code for the application.\
- [.eslintrc.js](https://eslint.org/docs/latest/user-guide/configuring/) - Configures eslint.
- [.gitignore](https://git-scm.com/docs/gitignore) - Files to ignore when checking into source system.
- docker-compose.yml - A standard [docker-compose.yml](https://docs.docker.com/compose/) file if desiring to run inside of docker in dev mode. If you are looking to simulate linkage to other services/areas, this may be a good spot to start.
- index.ts - Entry point for the application
- [jest.config.js](https://jestjs.io/docs/configuration) - The configuration file for jest. Based on the [rust setup](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler).
- [package-lock.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json) - File giving full versions of things installed with npm, and their dependencies.
- [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) - Describes project, including dependencies, scripts, ect. A good starting point when looking at any node project.
- tsconfig.build.json - Extension of tsconfig.json for use when building the project.
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - Typescript configurations.

## FAQ

- Why is this readme.md instead of README.md?
  - All of the other files (config, ect) in the modern world no longer have the convention of all caps, and it helps to keep eyes from being drawn to this file instead of other, potentially more important files in the file tree.
- Why are readme.md files scattered around the repo?
  - For every file/folder that you create, it should be easy to have a reason behind it. This makes an easy way to document it. Additionally, you can place TODOs and easily parse it out into a readable format. Finally, it is meant to be easy navigation of documents straight in a git graphical interface (github, gitlab, ect). This allows a quick high level overview for newcomers curious about something, and also allows the component to be pulled off to its own module quickly if needed. 