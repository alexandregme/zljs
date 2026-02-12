import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["core/**/*.test.{ts,tsx}"],
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
    },
  },
});
