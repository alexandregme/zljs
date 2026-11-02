import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../core/**/*.mdx", "../core/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: "@storybook/react-vite",

  viteFinal: (config) => {
    config.plugins = [...(config.plugins || []), tailwindcss()];
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@zljs/core": path.resolve(__dirname, "../core"),
        "@zljs/rhf": path.resolve(__dirname, "../core/rhf"),
        "@test-utils": path.resolve(__dirname, "../test-utils"),
        "next/link": path.resolve(__dirname, "mocks/next-link.tsx"),
        "next/link.js": path.resolve(__dirname, "mocks/next-link.tsx"),
      },
    };
    return config;
  },

  addons: [
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],
};

export default config;
