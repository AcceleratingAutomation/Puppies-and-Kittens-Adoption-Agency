const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 500,
  screenshotsFolder: "playwright/tests/ui/pages",
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    viewportWidth: 1440,
    viewportHeight: 1024,
  },
});
