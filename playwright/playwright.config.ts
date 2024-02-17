import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: process.env.CI ? 0.03 : 0.01,
    },
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Number of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://127.0.0.1:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against tablet viewports. */
    {
      name: "Pixel 7 landscape Chrome",
      use: { ...devices["Pixel 7 landscape"] },
    },
    {
      name: "iPad Pro 11 Safari",
      use: { ...devices["iPad Pro 11"] },
    },

    /* Test against mobile viewports. */
    {
      name: "Galaxy S23 Chrome",
      use: { ...devices["Galaxy S9+"], viewport: { width: 360, height: 780 } },
    },
    {
      name: "Galaxy S21 landscape Chrome",
      use: {
        ...devices["Galaxy S9+ landscape"],
        viewport: { width: 800, height: 360 },
      },
    },
    {
      name: "iPhone 14 Pro Max Safari",
      use: { ...devices["iPhone 14 Pro Max"] },
    },
    {
      name: "iPhone 12 landscape Chrome",
      use: {
        ...devices["iPhone 12 landscape"],
        viewport: { width: 750, height: 340 },
        defaultBrowserType: "chromium",
      },
    },

    /* Test against branded browsers. */
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start:both",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
});
