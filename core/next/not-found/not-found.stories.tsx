import type { Meta, StoryObj } from "@storybook/react-vite";
import { focusOutlineContrast, hoverTextContrast } from "@test-utils";
import { expect } from "storybook/test";
import { NotFound } from "./not-found";

export default {
  title: "Next/NotFound",
  component: NotFound,
  tags: ["autodocs"],
  parameters: { docs: { toc: true } },
} satisfies Meta<typeof NotFound>;

type Story = StoryObj<typeof NotFound>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls to try any text. It is the content of the app's 404 page, so it goes in `app/not-found.tsx` or `pages/404.tsx`, at the root of the router: a URL that matches no route only reaches the root one. It takes the height of the screen. It renders no `<main>`: that comes from `RootLayout`, in the app's root layout.",
      },
    },
  },
};

export const Texts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Every text has an English default, so an app in another language passes `title`, `message` and `backLabel`. `backHref` is where the link goes, `/` by default. This story checks the link's hover and focus, because axe sees neither.",
      },
    },
  },
  args: {
    title: "Order not found",
    message: "This order does not exist or was removed.",
    backHref: "/orders",
    backLabel: "See all orders",
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "See all orders" });

    await expect(hoverTextContrast(link)).toBeGreaterThanOrEqual(4.5);
    await expect(focusOutlineContrast(link)).toBeGreaterThanOrEqual(3);
  },
};
