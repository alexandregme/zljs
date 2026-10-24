import { resolve } from "path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    coverage: {
      provider: "v8",
      include: ["core/**/*.{ts,tsx}"],
      exclude: [
        "**/index.ts",
        "**/*.stories.tsx",
        "**/*.styles.ts",
        "**/*.interface.ts",
        "**/*.d.ts",
        "**/utils/**",
        "**/examples/**",
      ],
      reporter: [
        "text",
        "json-summary",
        "json",
        "lcov",
        "clover",
        resolve(__dirname, "vitest.coverage-reporter.cjs"),
      ],
    },
    alias: {
      "@zljs/core": resolve(__dirname, "core"),
      "@zljs/rhf": resolve(__dirname, "core/rhf"),
      "@test-utils": resolve(__dirname, "test-utils"),
    },
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["core/**/*.test.{ts,tsx}"],
        },
      },
      // Runs every story as a test in a real browser. This is the project the
      // Storybook "Run tests" panel (@storybook/addon-vitest) looks for.
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: resolve(__dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
