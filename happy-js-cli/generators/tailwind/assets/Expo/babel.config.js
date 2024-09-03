module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // needed for web in react-native-reanimated
      '@babel/plugin-proposal-export-namespace-from',
      'nativewind/babel',
      // react-native-reanimated must be last
      'react-native-reanimated/plugin'],
  };
};
