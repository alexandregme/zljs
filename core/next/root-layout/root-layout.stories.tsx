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
          "Goes in the app's root layout, around its content: `app/layout.tsx`, inside `<body>`, or `pages/_app.tsx`. It renders the page's `<main>` and takes the height of the visible screen, so pages and components like `NotFound` only provide the content and never render their own `<main>`.\n\nIt also counts the page views with Vercel Web Analytics, which shows them in the project on Vercel once Web Analytics is enabled there. It renders nothing on the page: it adds a script to the document, and in development that script sends nothing.",
      },
    },
  },
  args: {
    children: "Page content",
  },
};
