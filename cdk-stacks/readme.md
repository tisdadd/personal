# HFC_CDK_STACKS

A home for generic [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) stacks that can be used to help create complex infrastructure more easily.


This was bootstrapped with `npx cdk init app --language typescript`. Updates were made to add in the Airbnb Typescript config (with a disabling of `no-new` due to many stack parts not needing the output), and app structure. Compiled output now goes to `dist` folder, and tests live next to the stacks and constructs.

## Getting started

Clone or fork this repo if you want to experiment with the included stacks using the default lib/bin setup from cdk command. Else, copy what you need and customize as needed, and init separately.

`npm install` to get all needed packages installed.

If you have not already, it is recommended to go through the [CDK Workshop](https://cdkworkshop.com/) prior to making your own stacks.

## scripts

- `npm run build` - compile typescript to js
- `npm run test` - perform the jest unit tests
- `npm run cdk` - The straight passthrough to cdk with no options added.
- `npm run deploy` - cdk deploy this stack to your default AWS account/region
- `npm run diff` - cdk compare deployed stack with current state
- `npm run synth` - cdk emits the synthesized CloudFormation template

## Files/Folders

- [.fttemplates/](.fttemplates/readme.md) - Templates for use with VS Code [Folder Templates](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure) extension.
- [bin/](bin/readme.md) - The bin folder from the cdk init - this is where the app is started. See cdk.json and package.json if you wish to change it.
- cdk.out/ - Should be there after running a synth, this contains the cloud formation output from the command.
- dist/ - Should be there after running a build, this is the compiled ready to distribute javascript files.
- [lib/](lib/readme.md) - The stack/construct definitions.
- [node_modules/](https://docs.npmjs.com/cli/v9/configuring-npm/folders) - Standard node module install location.
- [.eslintrc.js](https://eslint.org/docs/latest/user-guide/configuring/) - Configures eslint.
- [.gitignore](https://git-scm.com/docs/gitignore) - Files to ignore when checking into source system.
- [.npmignore](https://docs.npmjs.com/cli/v9/using-npm/developers#keeping-files-out-of-your-package) - keeps files out of the final package.
- cdk.json - Tells the cdk how to execute the application. Docs are kind of spread out so for specifics may have to search if an edit may be needed, a reasonable starting point is the [AWS CDK Toolkit code](https://docs.aws.amazon.com/cdk/v2/guide/cli.html).
- [jest.config.ts](https://jestjs.io/docs/configuration) - The configuration file for jest.
- [package-lock.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json) - File giving full versions of things installed with npm, and their dependencies.
- [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) - Describes project, including dependencies, scripts, ect. A good starting point when looking at any node project.
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - Typescript configurations.