# Getting Started with HFC_JS_SEED CRA APP

This project was bootstrapped with [HFC_JS_SEED](https://github.com/HappyFunCorp/HFC_JS_SEED) utilizing the [Create React App](https://github.com/facebook/create-react-app), [Storybook](https://storybook.js.org/), [Jest testing](https://jestjs.io/), and [Airbnb Typescript Linting](https://www.npmjs.com/package/eslint-config-airbnb-typescript) setup. This readme is based on the CRA Readme included, with a few helpers.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### Note on Ejecting

It is commonly the case that people want to keep the benefits of CRA, but need something slightly different for a time. A good place to start looking into that is [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) which also includes links to some alternatives. Basically, update the package.json to get some intercept points to add your customizations.

### `npm run storybook`

Run a development storybook server to explore the application components. This sample application is set up to include the default react view, as well as demonstrate Context Provider/hook/HOC patterns as well through a simple logging provider.

### `npm run build-storybook`

Build a static storybook, ready for deployment.

### `npm run lint`

Run the linting process against the source folder, to see where errors may be.

### `npm run lint-fix`

Run the linting process against the source folder, fixing errors automatically where possible.

### `npm run dev`

Run both the storybook and react server at the same time.

### `docker-compose up`

If your system has [docker](https://www.docker.com/), this will launch docker-compose with the `dev` script.

## Files/Folders

- [.fttemplates/](.fttemplates/readme.md) - Templates for use with VS Code [Folder Templates](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure) extension.
- [.storybook/](.storybook/readme.md) - The storybook configuration files.
- [node_modules/](https://docs.npmjs.com/cli/v9/configuring-npm/folders) - Standard node module install location.
- [public/](public/readme.md) - Public, static (not generated in React) content. See [using the public folder](https://create-react-app.dev/docs/using-the-public-folder/).
- [src/](src/readme.md) - The main code for the application.
- .env - A file with environment variables, copied from .env.example - doesn't get checked in
- .env.example - A file with expected environment variables for others to know about - does get checked in.
- [.eslintignore](https://eslint.org/docs/latest/user-guide/configuring/ignoring-code) - Files ignored by eslint. Storybook required in setup.
- [.eslintrc.js](https://eslint.org/docs/latest/user-guide/configuring/) - Configures eslint.
- [.gitignore](https://git-scm.com/docs/gitignore) - Files to ignore when checking into source system.
- docker-compose.yml - A standard [docker-compose.yml](https://docs.docker.com/compose/) file if desiring to run inside of docker in dev mode. If you are looking to simulate linkage to other services/areas, this may be a good spot to start.
- [package-lock.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json) - File giving full versions of things installed with npm, and their dependencies.
- [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) - Describes project, including dependencies, scripts, ect. A good starting point when looking at any node project.
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - Typescript configurations.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## FAQ

- Why is this readme.md instead of README.md?
  - All of the other files (config, ect) in the modern world no longer have the convention of all caps, and it helps to keep eyes from being drawn to this file instead of other, potentially more important files in the file tree.
- Why are readme.md files scattered around the repo?
  - For every file/folder that you create, it should be easy to have a reason behind it. This makes an easy way to document it. Additionally, you can place TODOs and easily parse it out into a readable format. Finally, it is meant to be easy navigation of documents straight in a git graphical interface (github, gitlab, ect). This allows a quick high level overview for newcomers curious about something, and also allows the component to be pulled off to its own module quickly if needed. 