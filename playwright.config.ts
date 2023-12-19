import { defineConfig } from '@playwright/test';
import { resolve } from 'path';
import { config as dotenv } from 'dotenv';

dotenv({
  path: resolve(__dirname, '.env.test'),
});


export default defineConfig({
  globalTimeout: 10 * 60 * 1000, // 10 min for all test setup
  timeout: 2 * 1000 * 60, // 2min for each test
  expect: {
      timeout: 60000, // test wait 10 sec in expect
  },
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: '60%',
  reporter: [
    ['html', {open: 'never'}],
    ['blob']
  ],
  use: {
    headless: true,
    baseURL: 'https://lookerstudio.google.com',
    defaultBrowserType: 'chromium',
    trace: 'retain-on-failure',
    screenshot: {
        mode: 'only-on-failure',
        fullPage: true,
    },
    actionTimeout: 30000, // wait 10 sec for element to perform action (click, fill, etc)
},
});

