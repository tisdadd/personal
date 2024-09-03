import { ElectronApplication, Page, _electron as electron } from 'playwright';
import { expect, test } from '@playwright/test';

import {
  findLatestBuild,
  parseElectronApp,
} from 'electron-playwright-helpers';

let electronApp: ElectronApplication;

test.beforeAll(async () => {
  // find the latest build in the out directory
  const latestBuild = findLatestBuild();
  // parse the directory and find paths and other info
  const appInfo = parseElectronApp(latestBuild);
  // set the CI environment variable to true
  process.env.CI = 'e2e';
  electronApp = await electron.launch({
    args: [appInfo.main],
    executablePath: appInfo.executable,
  });
  electronApp.on('window', async (page: Page) => {
    const filename = page.url()?.split('/').pop();

    // tracking information for tests
    // eslint-disable-next-line no-console
    console.log(`Window opened: ${filename}`);

    // capture errors
    page.on('pageerror', (error) => {
      // tracking information for tests
    // eslint-disable-next-line no-console
      console.error(error);
    });
    // capture console messages
    page.on('console', (msg) => {
      // tracking information for tests
    // eslint-disable-next-line no-console
      console.log(msg.text());
    });
  });
});

test.afterAll(async () => {
  await electronApp.close();
});
test('save screenshot', async () => {
  const window: Page = await electronApp.firstWindow();
  await window.screenshot({ path: 'out/playwright-screenshots/intro.png' });
});

test('Can navigate pages', async () => {
  const window: Page = await electronApp.firstWindow();
  // check that on the tablepage
  expect(await window.getByText(/Pick A CSV to Create or Add to Table/i).count()).toBe(1);
  expect(await window.getByText(/learn react/i).count()).toBe(0);
  await window.getByRole('button', {
    name: 'open drawer',
  }).click();
  const defaultReact = window.getByRole('link', { name: 'Default React' });
  await defaultReact.waitFor();
  defaultReact.click();

  const learnReact = window.getByText(/learn react/i);
  await learnReact.waitFor();

  expect(await learnReact.count()).toBe(1);
  expect(await window.getByText('Pick A CSV to Create or Add to Table').count()).toBe(0);
});
