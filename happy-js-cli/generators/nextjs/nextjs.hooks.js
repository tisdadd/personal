import { $ as terminalProcess, fs } from 'zx'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import replaceFileText from '../../util/replaceFileText/index.js'
import updateJsonFile from '../../util/updateJsonFile/index.js'

import generateOptionDescriptions from '../../util/generateOptionDescriptions.js'
import generatePromptQuestions from '../../util/generatePromptQuestions.js'
import deleteProjectFiles from '../../util/deleteProjectFiles.js'

import cliArgDefinition from './nextjs.cliArgDefinition.js'

import definition from './nextjs.definition.js'

const thisDir = dirname(fileURLToPath(import.meta.url))

export default function getHooks () {
  return {
    priorityIndex: 90,
    cliOptionDescriptions: params =>
      generateOptionDescriptions(params, cliArgDefinition),
    promptQuestions: params =>
      generatePromptQuestions(params, cliArgDefinition),
    async boilerplate ({ optionValues: { relativeDirectory, projectType } }) {
      if (projectType !== 'NextJS') {
        return
      }

      // create app, install the basics
      await terminalProcess`npx create-next-app@latest ${relativeDirectory} --typescript --eslint`
    },
    async installDeps ({ optionValues: { projectType } }) {
      if (projectType !== 'NextJS') {
        return
      }

      // using npm because of caching issue with one of the packages in yarn...
      // filename ends up too long locally
      await terminalProcess`npx install-peerdeps --dev eslint-config-airbnb`
      await terminalProcess`npm install ${definition.devDependencies} --save-dev`
      // await terminalProcess`npx storybook@latest init --package-manager=npm`;
    },
    async updateAllFiles ({ finalDirectory, optionValues: { projectType } }) {
      if (projectType !== 'NextJS') {
        return
      }

      // copy new files
      await fs.copy(join(thisDir, 'assets'), join(finalDirectory), {
        overwrite: true
      })

      // check if src directory was chosen
      const isUsingSrc = fs.existsSync(join(finalDirectory, 'src', 'pages'))
      const perceivedProjectRoot = isUsingSrc
        ? join(finalDirectory, 'src')
        : finalDirectory
      const pagesDirectory = join(perceivedProjectRoot, 'pages')

      const removeFiles = [...definition.removeFiles]

      // if isUsingSrc, need to move some files to src that were copied
      if (isUsingSrc) {
        await fs.move(join(finalDirectory, 'pages'), pagesDirectory, {
          overwrite: true
        })

        await fs.move(
          join(finalDirectory, 'styles', 'readme.md'),
          join(perceivedProjectRoot, 'styles', 'readme.md')
        )

        replaceFileText(join(pagesDirectory, '_app.tsx'), 'src/', '')
        replaceFileText(join(pagesDirectory, 'index.tsx'), 'src/', '')
        replaceFileText(
          join(finalDirectory, '.storybook', 'preview.tsx'),
          'styles/',
          'src/styles/'
        )
        replaceFileText(
          join(finalDirectory, '.fttemplates', 'Page', '[FTName].tsx'),
          '../src/views',
          '../views'
        )

        removeFiles.push('styles')
      }

      deleteProjectFiles(finalDirectory, removeFiles)

      await fs.copy(
        join(finalDirectory, '.env.example'),
        join(finalDirectory, '.env.local'),
        { overwrite: true }
      )
    },
    async updatePackageJson ({ optionValues: { projectType } }) {
      if (projectType !== 'NextJS') {
        return
      }

      // update package.json
      await updateJsonFile(join(process.cwd(), 'package.json'), jsonIn => {
        const packageJSON = jsonIn
        delete packageJSON.eslintConfig
        packageJSON.scripts['dev:next'] = packageJSON.scripts.dev
        packageJSON.scripts['lint-fix'] = 'next lint --fix'
        packageJSON.scripts.dev = 'concurrently "npm:dev:*"'
        packageJSON.scripts[
          'dev:storybook'
        ] = `${packageJSON.scripts.storybook}`
        delete packageJSON.scripts.storybook
        packageJSON.scripts.test = 'jest --watch'
        packageJSON.scripts['test:ci'] = 'jest --ci'
      })
    },
    async postGenerate ({ optionValues: { projectType } }) {
      if (projectType !== 'NextJS') {
        return
      }

      // update tsConfig.json
      await updateJsonFile(join(process.cwd(), 'tsconfig.json'), jsonIn => {
        const tsConfigJSON = jsonIn
        tsConfigJSON.include = [...tsConfigJSON.include, '**/*.js', '**/*.jsx']
      })

      try {
        await terminalProcess`npm run lint-fix`
      } catch (e) {
        // don't care about remaining linting errors
      }
    }
  }
}
