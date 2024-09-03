const definition = {
  devDependencies: [
    'eslint-plugin-security',
    'jest',
    'jest-environment-jsdom',
    // 'storybook-addon-next',
    'eslint-plugin-jest',
    'eslint-plugin-testing-library',
    '@testing-library/react',
    // '@types/testing-library__jest-dom',
    '@testing-library/jest-dom',
    '@testing-library/user-event',
    'eslint-config-airbnb-typescript',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-plugin-storybook',
    'react-inject-env',
    'concurrently'
  ],
  removeFiles: [
    'README.md',
    'styles/Home.module.css',
    'src/styles/Home.module.css',
    'stories',
    'src/stories',
    '.stories',
    '.storybook/preview.ts'
  ]
}

export default definition
