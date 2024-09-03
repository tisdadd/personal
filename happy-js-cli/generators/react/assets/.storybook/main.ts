import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: "tag",
  },
  env: (config) => {
    const base: {[key: string]: any} = {
      ...config,
    };

    Object.entries(process.env).forEach(([key, value]) => {
      if (key.startsWith('REACT_APP')) {
        base[key] = value;
      }
    });
    return base;
  },
};

export default config;