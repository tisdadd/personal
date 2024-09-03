/** @type {import('jest').Config} */

const customJestConfig = {
  runner: '@kayahr/jest-electron-runner',
  moduleDirectories: [
    'node_modules',
    'release/app/node_modules',
    'src',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
  ],
  testPathIgnorePatterns: ['.fttemplates', 'e2e-tests'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
  testEnvironment: '@kayahr/jest-electron-runner/environment',
  testEnvironmentOptions: {
    url: 'http://localhost/',
    electron: {
      options: [
        'no-sandbox',
        'ignore-certificate-errors',
        'force-device-scale-factor=1',
      ],
      disableHardwareAcceleration: false,
    },
  },
  transform: {
    '\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
};

export default customJestConfig;
