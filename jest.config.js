const EXCLUDED_FOLDERS = [
  "<rootDir>/.storybook/",
  "<rootDir>/coverage/",
  "<rootDir>/build/",
  "<rootDir>/node_modules/",
];

const COVERAGE = [
  "<rootDir>/**/*.{jsx,ts,tsx}",
  "!<rootDir>/**/*.{js}",
  "!<rootDir>/**/index.{js,jsx,ts,tsx}",
  "!<rootDir>/**/*.d.ts",
  "!<rootDir>/**/*.stories.tsx",
  "!<rootDir>/**/*.styles.ts",
  "!<rootDir>/*.config.js",
  "!<rootDir>/jest.env.js",
  "!<rootDir>/jest.reporter.js",
  "!<rootDir>/**/utils/**/*.{jsx,ts,tsx}",
];

module.exports = {
  //config
  roots: ["<rootDir>/core"],
  testMatch: ["**/*.test.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/jest.env.js"],
  testEnvironment: "jsdom",
  //coverage
  collectCoverage: true,
  collectCoverageFrom: COVERAGE,
  coveragePathIgnorePatterns: EXCLUDED_FOLDERS,
  testPathIgnorePatterns: EXCLUDED_FOLDERS,
  modulePathIgnorePatterns: EXCLUDED_FOLDERS,
  //report
  reporters: ["default", "<rootDir>/jest.reporter.js"],
  coverageReporters: ["json-summary", "json", "lcov", "text", "clover"],
  //transform
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png)$": "<rootDir>/__mocks__/imageMock.js",
  },
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          target: "es2021",
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};
