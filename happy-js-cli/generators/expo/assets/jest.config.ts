/** @type {import('jest').Config} */

const customJestConfig = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  testPathIgnorePatterns: ['.fttemplates'],
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
  testEnvironmentOptions: {},
};

export default customJestConfig;
