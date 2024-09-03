# Getting Started with HFC_JS_SEED NextJS APP

This  is a [Next.js](https://nextjs.org/) projectbootstrapped with [HFC_JS_SEED](https://github.com/HappyFunCorp/HFC_JS_SEED), utilizing the [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), [Storybook](https://storybook.js.org/), [Jest testing](https://jestjs.io/), and [Airbnb Typescript Linting](https://www.npmjs.com/package/eslint-config-airbnb-typescript) setup. This readme is based on the Next JS Readme.

It is assumed that you have [Node.js](https://nodejs.org/en/) 18+ installed for the generated projects. If you do not, please install it before continuing.

## Available Scripts

- `npm run dev` - Starts the [next development server](http://localhost:3000/) and the [storybook development server](http://localhost:6006/)
- `npm run build` - [Builds](https://nextjs.org/docs/deployment) an optimized version of the application for production in a .next folder.
- `npm run start` - [Runs a server for the built product](https://nextjs.org/docs/deployment#nodejs-server)
- `npm run lint` - Lints the project
- `build-storybook` - Builds the static storybook content.
- `npm run dev:next` - Runs just the [next development server](http://localhost:3000/).
- `npm run lint-fix` - Fixing linting where it can.
- `npm run dev:storybook` - Runs just the [storybook development server](http://localhost:6006/).
- `npm run test` - Runs the jest unit tests in interactive watch mode.
- `npm run test:ci` - Runs the jest unit tests in non-interactive mode.

## Base NextJs Information

### Getting Started

First, run the development server:

```bash
npm run dev
# or
npm run dev:next
```

Open [http://localhost:3000](http://localhost:3000) with your browser after running to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Files/Folders

- [.fttemplates/](.fttemplates/readme.md) - Templates for use with VS Code [Folder Templates](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure) extension.
- [.next/](https://nextjs.org/docs/deployment#nextjs-build-api) - Build/cache folder for next
- [.storybook/](.storybook/readme.md) - The storybook configuration files.
- [node_modules/](https://docs.npmjs.com/cli/v9/configuring-npm/folders) - Standard node module install location.
- [pages/](pages/readme.md) - That which is served to users - both the api and the final routes come from here. Eventually, the app directory will be used instead, but at time of this project was not yet in a recommended production state. Note that, if you used the command line option to use src, [pages will be there instead](src/pages/readme.md), this comment is safe to delete then.
- [public/](public/readme.md) - Public, static (not generated in Next) content. See [static file serving](https://nextjs.org/docs/api-routes/introduction). This directory should be cleaned up by the developer for their own needs/favicon. At generation time, it has images used in the included sample view.
- [src/](src/readme.md) - The main code for the application.
- [styles/](styles/readme.md) - Global style modules go here. If initialized using src directory, [this folder is inside of src instead](src/styles/readme.md) - you may delete this line.
- .env.example - A file with expected environment variables for others to know about - does get checked in.
- .env.local - A file with environment variables, copied from .env.example - doesn't get checked in
- [.eslintrc.json](https://eslint.org/docs/latest/user-guide/configuring/) - Configures eslint.
- [.gitignore](https://git-scm.com/docs/gitignore) - Files to ignore when checking into source system.
- docker-compose.yml - A standard [docker-compose.yml](https://docs.docker.com/compose/) file if desiring to run inside of docker in dev mode. If you are looking to simulate linkage to other services/areas, this may be a good spot to start.
- [jest.config.js](https://jestjs.io/docs/configuration) - The configuration file for jest. Based on the [rust setup](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler).
- jest.setup.js - Runs as part of the jest config.
- next-env.d.ts - [Used for the Next Typescript](https://nextjs.org/docs/basic-features/typescript). Do not edit.
- [next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction) - Advanced configurations for next.
- [package-lock.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json) - File giving full versions of things installed with npm, and their dependencies.
- [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) - Describes project, including dependencies, scripts, ect. A good starting point when looking at any node project.
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - Typescript configurations.

## FAQ

- Why is this readme.md instead of README.md?
  - All of the other files (config, ect) in the modern world no longer have the convention of all caps, and it helps to keep eyes from being drawn to this file instead of other, potentially more important files in the file tree.
- Why are readme.md files scattered around the repo?
  - For every file/folder that you create, it should be easy to have a reason behind it. This makes an easy way to document it. Additionally, you can place TODOs and easily parse it out into a readable format. Finally, it is meant to be easy navigation of documents straight in a git graphical interface (github, gitlab, ect). This allows a quick high level overview for newcomers curious about something, and also allows the component to be pulled off to its own module quickly if needed. 