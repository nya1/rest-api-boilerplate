module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: [
      "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: [
      "import",
      "no-only-tests"
    ],
    parserOptions: {
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: "module" // Allows for the use of imports
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          "devDependencies": ["test/**", "scripts/**"], // allow dev deps on tests and scripts
          "optionalDependencies": false,
          "peerDependencies": false
        }
      ],
      "import/order": 1,
      "import/no-duplicates": ["error"],
      "max-len": ["error", { "code": 100, "ignoreComments": true }],
      "no-only-tests/no-only-tests": "error",
    }
};
