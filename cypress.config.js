const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 500,
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    viewportWidth: 1440,
    viewportHeight: 1024,
  },
});
