module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // For the registration object in serviceWorker for ServiceWorkerRegistration
    "no-param-reassign": ["error", { props: false }],
    "linebreak-style": ["error", "unix"],
    "prettier/prettier": "error",
    // Disable for relative imports from development project and playwright tests
    "import/no-relative-packages": "off",
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
    },
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
};
