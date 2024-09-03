> [Up One Level](../readme.md)

# Sample Quizzer

A simple quiz application created for testing using the samples gathered in the courses. The main project here just generates the questions into json files (for the root here for easy access, or for the react-front-end if someone wants them there)

## Run the generator

Make sure you have node and yarn installed (if you have node version manager, it will automatically use the version this was generated with). Then `yarn install` and `yarn start` to (re)generate the files. 

## Use simple front end

If you want to use the super simple front end, `cd react-front-end`, `yarn install`, and `yarn start`.

## Files/Folders

- [arrayOfRegexGroupStrings/](arrayOfRegexGroupStrings/readme.md) - A simple function to give an array of arrays of the specified groups from a regex.
- [react-front-end](react-front-end/readme.md) - A super simple front end - no advanced features whatsover, just red/green for right wrong answers.
- .gitignore - a standard [gitignore](https://git-scm.com/docs/gitignore) file
- .nvmrc - [Node Version Manager](https://github.com/nvm-sh/nvm/blob/master/README.md) file for specifying node version.
- index.js - The entry point for this application
- package.json - Standard [npm package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
- yarn.lock - Standard yarn lock file, it says what versions everything is at.