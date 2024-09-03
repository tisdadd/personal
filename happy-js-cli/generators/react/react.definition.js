const definition = {
  devDependencies: [
    'eslint-plugin-security',
    'eslint-config-airbnb-typescript',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-plugin-storybook',
    '@storybook/addon-console',
    'react-inject-env',
    'concurrently',
  ],
  dependencies: [
    'react-router-dom',
  ],
  removeFiles: [
    'README.md',
    'src/App.test.tsx',
    'src/App.css',
    'src/logo.svg',
    'src/stories',
    '.storybook',
  ],
};

export default definition;
