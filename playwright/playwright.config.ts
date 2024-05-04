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
      maxDiffPixelRatio: process.env.CI ? 0.04 : 0.01,
    },
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry attempts */
  retries: process.env.CI ? 1 : 1,
  /* Number of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? "blob" : "html",
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

  /* Configure projects for different types of tests and major browsers */
  projects: [
    // Setup project
    { name: authSetup, testMatch: /.*\.setup\.ts/ },

    /* Visual, ui integration, user acceptance, and regression tests */
    {
      name: "desktop view",
      use: {
        ...devices["Desktop Chrome"],
        storageState: authFile,
        viewport: { width: 1920, height: 910 },
        channel: "chrome",
      },
      testDir: "./ui",
      dependencies: [authSetup],
    },
    {
      name: "mobile view",
      use: {
        ...devices["iPhone 12 Pro"],
        storageState: authFile,
        viewport: { width: 390, height: 664 },
      },
      testDir: "./ui",
      dependencies: [authSetup],
    },

    /* Lighthouse audit - Performance, accessibility, best practices, and SEO tests */
    {
      name: "lighthouse desktop",
      use: {
        ...devices["Desktop Chrome"],
        storageState: authFile,
        viewport: { width: 1920, height: 910 },
        channel: "chrome",
      },
      dependencies: [authSetup],
      testDir: "./lighthouse",
    },
    {
      name: "lighthouse mobile",
      use: {
        ...devices["Galaxy S9+"],
        storageState: authFile,
        viewport: { width: 320, height: 658 },
        channel: "chrome",
      },
      dependencies: [authSetup],
      testDir: "./lighthouse",
    },

    /* Test against browser engines. */
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: authFile,
      },
      dependencies: [authSetup],
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: authFile,
      },
      dependencies: [authSetup],
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: authFile,
      },
      dependencies: [authSetup],
    },

    /* Test against tablet viewports. */
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
      name: "iPhone 15 Pro Safari",
      use: {
        ...devices["iPhone 15 Pro"],
        storageState: authFile,
        viewport: { width: 393, height: 852 },
      },
      dependencies: [authSetup],
    },

    /* Test against branded browsers. */
    {
      name: "Microsoft Edge",
      use: {
        ...devices["Desktop Edge"],
        storageState: authFile,
        viewport: { width: 1920, height: 910 },
        channel: "msedge",
      },
      dependencies: [authSetup],
    },
    {
      name: "Google Chrome",
      use: {
        ...devices["Desktop Chrome"],
        storageState: authFile,
        viewport: { width: 2560, height: 910 },
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
