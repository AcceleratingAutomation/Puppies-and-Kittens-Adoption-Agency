module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // For the registration object in serviceWorker for ServiceWorkerRegistration
    "no-param-reassign": ["error", { props: false }],
    "linebreak-style": ["error", "unix"],
    "prettier/prettier": "error",
  },
};
