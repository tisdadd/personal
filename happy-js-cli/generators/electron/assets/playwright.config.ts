import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  name: 'e2e',
  testDir: './e2e-tests',
  maxFailures: 5,
};

export default config;
