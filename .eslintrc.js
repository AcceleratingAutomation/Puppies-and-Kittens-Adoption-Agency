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
    project: "./playwright/tsconfig.json",
  },
  rules: {
    // For the registration object in serviceWorker for ServiceWorkerRegistration
    "no-param-reassign": ["error", { props: false }],
    "linebreak-style": ["error", "unix"],
    "prettier/prettier": "error",
    // Disable for relative imports from development project and playwright tests
    "import/no-relative-packages": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          // Jest unit tests
          "**/__jest__/**",
          // Jest unit tests
          "**/__tests__/**",
          // Playwright integration and e2e tests
          "playwright/**/*",
        ],
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  overrides: [
    {
      // Playwright integration and e2e tests
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        // Playwright best practice
        "@typescript-eslint/no-floating-promises": "error",
      },
    },
    {
      // Allow console statements in the Playwright directory
      files: ["playwright/**/*"],
      rules: {
        "no-console": "off",
      },
    },
    {
      // Jest unit tests
      files: ["**/__jest__/**/*.{js,jsx}", "**/__tests__/**/*test.{js,jsx}"],
      env: {
        jest: true,
      },
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
