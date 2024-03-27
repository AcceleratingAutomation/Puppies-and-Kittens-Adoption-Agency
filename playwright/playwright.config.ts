import { defineConfig, devices } from "@playwright/test";
import baseEnvUrl from "../src/utils/baseEnvironmentUrls";
import "dotenv/config"; // https://github.com/motdotla/dotenv

export const authFile = "./.auth/user.json";
const authSetup = "auth-setup";
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
  /* Retry attempts */
  retries: process.env.CI ? 1 : 1,
  /* Number of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL:
      process.env.TEST_ENV === "production"
        ? baseEnvUrl.production.ui
        : baseEnvUrl.local.ui,

    /* Collect trace, video, and screenshot when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    video: "on-first-retry",
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { name: authSetup, testMatch: /.*\.setup\.ts/ },

    /* Test against browser engines. */
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: authFile,
      },
      dependencies: [authSetup],
      testIgnore: ["**/*.setup.ts"],
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], storageState: authFile },
      dependencies: [authSetup],
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], storageState: authFile },
      dependencies: [authSetup],
    },

    /* Test against tablet viewports. */
    {
      name: "Pixel 7 landscape Chrome",
      use: {
        ...devices["Pixel 7 landscape"],
        storageState: authFile,
      },
      dependencies: [authSetup],
    },
    {
      name: "iPad Pro 12 Safari",
      use: {
        /* iPad Pro 11 is the latest available in playwright devices. Manually setting viewport to iPad Pro 12 (2021). */
        ...devices["iPad Pro 11"],
        storageState: authFile,
        viewport: { width: 1024, height: 1366 },
      },
      dependencies: [authSetup],
    },

    /* Test against mobile viewports. */
    {
      name: "Galaxy S23 Chrome",
      use: {
        ...devices["Galaxy S9+"],
        storageState: authFile,
        viewport: { width: 360, height: 780 },
      },
      dependencies: [authSetup],
    },
    {
      name: "Galaxy S21 landscape Chrome",
      use: {
        ...devices["Galaxy S9+ landscape"],
        storageState: authFile,
        viewport: { width: 800, height: 360 },
      },
      dependencies: [authSetup],
    },
    {
      name: "iPhone 14 Pro Max Safari",
      use: {
        ...devices["iPhone 14 Pro Max"],
        storageState: authFile,
      },
      dependencies: [authSetup],
    },
    {
      name: "iPhone 12 landscape Chrome",
      use: {
        ...devices["iPhone 12 landscape"],
        storageState: authFile,
        viewport: { width: 750, height: 340 },
        defaultBrowserType: "chromium",
      },
      dependencies: [authSetup],
    },

    /* Test against branded browsers. */
    {
      name: "Microsoft Edge",
      use: {
        ...devices["Desktop Edge"],
        storageState: authFile,
        channel: "msedge",
      },
      dependencies: [authSetup],
    },
    {
      name: "Google Chrome",
      use: {
        ...devices["Desktop Chrome"],
        storageState: authFile,
        channel: "chrome",
      },
      dependencies: [authSetup],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start:both",
    url:
      process.env.TEST_ENV === "production"
        ? baseEnvUrl.production.ui
        : baseEnvUrl.local.ui,
    reuseExistingServer: !process.env.CI,
  },
});
