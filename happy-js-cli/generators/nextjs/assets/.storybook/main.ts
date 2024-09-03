const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: true
  },
  env: (config) => {
    const base = {
      ...config,
    };

    Object.entries(process.env).forEach(([key, value]) => {
      if (key.startsWith('NEXT_PUBLIC')) {
        base[key] = value;
      }
    });
    return base;
  },
};
