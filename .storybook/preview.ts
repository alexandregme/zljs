import type { Preview } from "@storybook/react-vite";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          "Components",
          "Forms",
          ["Examples", "*", "Error"],
          "Next",
        ],
      },
    },
    // Every story is an axe test: a violation fails the run.
    a11y: {
      test: "error",
    },
  },
};

export default preview;
