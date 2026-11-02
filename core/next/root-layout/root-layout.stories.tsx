import type { Meta, StoryObj } from "@storybook/react-vite";
import { RootLayout } from "./root-layout";

export default {
  title: "Next/RootLayout",
  component: RootLayout,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof RootLayout>;

type Story = StoryObj<typeof RootLayout>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Goes in the app's root layout, around its content: `app/layout.tsx`, inside `<body>`, or `pages/_app.tsx`. It renders the page's `<main>` and takes the height of the visible screen, so pages and components like `NotFound` only provide the content and never render their own `<main>`.",
      },
    },
  },
  args: {
    children: "Page content",
  },
};
