import { useEffect } from "react";
import type { Decorator, Preview } from "@storybook/react-vite";
import { setTheme } from "@zljs/core";
import type { Theme } from "@zljs/core";
import "./storybook.css";

// Applies the theme of the toolbar the way an app does, and paints the surface
// behind the story: the docs page is always white, and a story in the dark
// theme needs a dark surface under it.
const withTheme: Decorator = (Story, { globals }) => {
  const theme = globals.theme as Theme;

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <div className="bg-zl-surface text-zl-text">
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "The theme of the components",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "system", title: "System", icon: "browser" },
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "system",
  },
  decorators: [withTheme],
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
