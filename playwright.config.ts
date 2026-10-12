import { defineConfig } from '@playwright/test';
const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173/';
export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  reporter: 'list',
});
