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
      },
    },
    rules: {
      "no-console": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    files: ["**/*.stories.tsx", "**/*.test.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message:
                "Import other components from the library barrel (@zljs/core), not by relative path.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
      "storybook-static/",
      "vitest.coverage-reporter.cjs",
      "agent/",
    ],
  },
  storybook.configs["flat/recommended"],
);
