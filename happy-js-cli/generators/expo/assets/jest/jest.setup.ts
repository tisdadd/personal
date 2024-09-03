import '@testing-library/jest-native/extend-expect';

// https://github.com/software-mansion/react-native-reanimated/issues/3125#issuecomment-1085865635
// eslint-disable-next-line no-underscore-dangle
global.__reanimatedWorkletInit = () => {};
// eslint-disable-next-line global-require
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
