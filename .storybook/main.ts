import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../core/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: "@storybook/react-vite",
  viteFinal: (config) => {
    config.plugins = [...(config.plugins || []), tailwindcss()];
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@zljs/core": path.resolve(__dirname, "../core"),
        "@zljs/rhf": path.resolve(__dirname, "../core/rhf"),
      },
    };
    return config;
  },
};

export default config;
