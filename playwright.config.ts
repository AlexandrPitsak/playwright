import { defineConfig } from '@playwright/test';
// require('dotenv').config();
export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: '60%',
  reporter: [
    ['html'],
    ['blob']
  ],
  use: {
    trace: 'on-first-retry',
  },
});

