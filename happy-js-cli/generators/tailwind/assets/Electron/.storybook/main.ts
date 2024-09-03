// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react-webpack5",
  "core": {
    disableTelemetry: true
  },
  webpackFinal: async (config) => {
    // configure for absolute imports
    // config.resolve.plugins = [
    //   ...(config.resolve.plugins || []),
    //   new TsconfigPathsPlugin({
    //     extensions: config.resolve.extensions,
    //   }),
    // ];

    // // disable whatever is already set to load SVGs
    config.module.rules
      .filter(rule => rule.test?.test('.svg'))
      .forEach(rule => rule.exclude = /\.svg$/i);

    // add SVGR instead
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack'
        },
      ],
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/]
      }
    });

    config.module.rules.push({
      test: /\.css$/i,
      use: [
          {
            loader: "postcss-loader"
          },
        ]
    });

    return config;
  },
  previewHead: (head)=>`
${head}
<script>window.electronAPI = window.parent.window.electronAPI</script>
`
} 