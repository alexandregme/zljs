// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      "no-console": "error",
    },
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
      "storybook-static/",
      "jest.reporter.js",
      "jest.env.js",
      "__mocks__/",
    ],
  },
  storybook.configs["flat/recommended"],
);
