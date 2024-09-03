# Getting Started with HFC_JS_SEED Expo App

This project was bootstrapped with [HFC_JS_SEED](https://github.com/HappyFunCorp/HFC_JS_SEED) utilizing the [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) with [Storybook Template](https://github.com/dannyhw/expo-storybook-starter), [Jest testing](https://jestjs.io/), and [Airbnb Typescript Linting](https://www.npmjs.com/package/eslint-config-airbnb-typescript) setup.

Please initialize through `npm install`.

Note that this is assumed to have Node 18+ installed. If not, please configure the package.json commands to remove the `cross-env NODE_OPTIONS=--openssl-legacy-provider` where it exists.

## Available Scripts

- `npm run start` - Starts the Expo Go app server in dev mode - can then launch to web, ios, or android.
- `npm run android` - Starts the project directly on android or Android emulator
- `npm run ios` - Starts the project directly on ios (Mac only).
- `npm run web` - Starts the project directly for web.
- `npm run lint` - Lints the project
- `npm run lint-fix` - Fixing linting where it can.
- `npm run test` - Run the jest unit tests
- `npm run storybook` - Runs the start command in storybook mode (Stories only)
- `npm run storybook-generate` - Generated on device storybook info.
- `npm run storybook-watch` - Auto run the generator when a new story is made.
- `npm run storybook:web` - Runs storybook in web mode.
- `npm run storybook:ios` - Runs storybook for ios
- `npm run storybook:android` - Runs storybook for android
- `npm run export-web` - [Exports the project as a web project](https://docs.expo.dev/distribution/publishing-websites/) to the `web-build` directory.
- `npm run build-storybook` - Exports the storybook for web as a static site to the `storybook-static` directory

## Files/Folders

- [.fttemplates/](.fttemplates/readme.md) - Templates for use with VS Code [Folder Templates](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure) extension.
- [.storybook/](.storybook/readme.md) - The storybook configuration files.
- [.storybookWeb/](.storybookWeb/readme.md) - The storybook for web configuration files.
- [assets/](assets/readme.md) - Static assets living outside of the main source.
- [jest/](jest/readme.md) - Extra (non-config) jest files go here.
- [node_modules/](https://docs.npmjs.com/cli/v9/configuring-npm/folders) - Standard node module install location.
- [src/](src/readme.md) - The main code for the application.
- storybook-static/ - Root of the storybook static web site if using the `build-storybook-web` script.
- web-build/ - Root of the static web site built if using the export-web script.
- [.eslintrc.json](https://eslint.org/docs/latest/user-guide/configuring/) - Configures eslint.
- [.gitignore](https://git-scm.com/docs/gitignore) - Files to ignore when checking into source system.
- [app.config.ts](https://docs.expo.dev/workflow/configuration/) - The configuration file for expo.
- App.tsx - Default entry point for the expo application - this is the main entry, determines if in storybook mode or not and loads from there.
- [babel.config.js](https://babeljs.io/docs/configuration#javascript-configuration-files) - Standard babel configuration.
- [jest.config.ts](https://jestjs.io/docs/configuration) - The configuration file for jest.
- [metro.config.js](https://docs.expo.dev/guides/customizing-metro/) - The configuration file for metro. Used to let storybook load without some errors.
- [package-lock.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json) - File giving full versions of things installed with npm, and their dependencies.
- [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) - Describes project, including dependencies, scripts, ect. A good starting point when looking at any node project.
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - Typescript configurations.

## Compiling and Shipping to the App Stores

As this project is an Expo project, it will work work easiest with [Expo Application Services](https://expo.dev/eas) assuming that your requirements allow you to use this. You may [also configure builds locally if needed](https://docs.expo.dev/build-reference/local-builds/), then go through the normal app store submission processes.

However, should you desire a more full eject, you may run the `npx expo prebuild` and then delete expo scripts from here. [More on prebuild can be found here](https://docs.expo.dev/workflow/prebuild/). One could also start a react-native project from scratch, and then move the code over, installing just the dependencies from expo used in the main project. The author recommends trying to remain inside of the expo system unless there is compelling reason to leave it.

## FAQ

- Why is this readme.md instead of README.md?
  - All of the other files (config, ect) in the modern world no longer have the convention of all caps, and it helps to keep eyes from being drawn to this file instead of other, potentially more important files in the file tree.
- Why are readme.md files scattered around the repo?
  - For every file/folder that you create, it should be easy to have a reason behind it. This makes an easy way to document it. Additionally, you can place TODOs and easily parse it out into a readable format. Finally, it is meant to be easy navigation of documents straight in a git graphical interface (github, gitlab, ect). This allows a quick high level overview for newcomers curious about something, and also allows the component to be pulled off to its own module quickly if needed.
- End to End Testing?
  - As this starter package is designed to keep things as simple/fully-updatable as possible, and not need to eject/pre-build these are not included. While detox is not directly supporting expo, you may choose to implement it as seen [here](https://docs.expo.dev/build-reference/e2e-tests/). However, since this was labeled as still in very early state, if required it will need to be manually added. Also, if running things locally instead of through the EAS services, more software will be needed (Android/iOS simulator).
- `npm run storybook-web` is throwing an error, why?
  - This is designed to run as evergreen as possible using well known tool sets. Sadly, while Storybook is well known and Expo is well known, sometimes they get out of sync on the web side. You may check the [web workflow](https://docs.expo.dev/workflow/web/) or [Expo Storybook Web Example](https://github.com/expo/examples/tree/master/with-storybook) to see what is a currently known configuration difference should this occur. Otherwise, continue to run the storybook in your device, or use `w` to launch the react-native storybook in the web when running regular `npm run storybook`.
