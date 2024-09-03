const plugins = [];
if (process.env.STORYBOOK_ENABLED) {
  plugins.push(['babel-plugin-react-docgen-typescript', { exclude: ['node_modules'] }]);
}

module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ...plugins,
      // needed for web in react-native-reanimated
      '@babel/plugin-proposal-export-namespace-from',
      // react-native-reanimated must be last
      'react-native-reanimated/plugin'],
  };
};
