/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  roots: ["<rootDir>/core"],
  testMatch: ["**/*.test.tsx", "**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: [
    "core/**/*.{ts,tsx}",
    "!core/**/*.test.{ts,tsx}",
    "!core/**/index.ts",
    "!core/**/*.stories.{ts,tsx}",
    "!core/**/*.mdx",
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
