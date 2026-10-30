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
    // "todo" reports violations in the a11y panel without failing the run.
    // Switch to "error" once the existing violations are fixed.
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
