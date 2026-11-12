import type { Meta, StoryObj } from "@storybook/react-vite";
import type { NavigationProps } from "@zljs/core";
import { appInitialState, useAppStore } from "@zljs/core";
import { expect } from "storybook/test";
import { Navigation } from "./navigation";

export default {
  title: "Features/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  // Each story is one whole navigation, and the logout opens a modal: isolate them.
  parameters: {
    layout: "fullscreen",
    docs: { toc: true, story: { inline: false, height: "420px" } },
  },
  // The logout modal opens through `useAppStore`, which every story shares.
  beforeEach: () => {
    useAppStore.setState(appInitialState);
  },
} satisfies Meta<typeof Navigation>;

const requiredProps: NavigationProps = {
  sections: [
    {
      items: [
        { icon: "LayoutDashboard", label: "Dashboard", href: "/dashboard" },
        { icon: "MessageSquare", label: "Messenger", href: "/messenger" },
        { icon: "Users", label: "Clients", href: "/clients" },
      ],
    },
    {
      items: [
        { icon: "Store", label: "Products", href: "/products" },
        { icon: "ShoppingCart", label: "Orders", href: "/orders" },
      ],
    },
  ],
  user: { name: "Alexandre Mendes", email: "user@example.com" },
  collapseLabel: "Close menu",
  onLogout: () => {},
};

type Story = StoryObj<typeof Navigation>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The navigation of an app, from one set of values: `Sidebar` on a screen from 768px wide, and `TopNav` under that. It follows the screen as it is resized or turned, and only one of the two is ever rendered. It takes the props of both: what they share goes to the one that shows, `collapseLabel`, `expandLabel` and `defaultCollapsed` only to `Sidebar`, and `menuLabel` and `accountLabel` only to `TopNav`. The app places it: `Sidebar` goes beside the page and `TopNav` over it, so the wrapper is a row from 768px and a column under it (`flex flex-col md:flex-row`). On the server it renders nothing, because the width of the screen isn't known there. Resize this frame to see it swap.",
      },
    },
  },
  args: requiredProps,
};

export const Modes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`mode` is for an app made for one kind of screen: `mobile` always shows `TopNav`, as this story does at any width, and `desktop` always shows `Sidebar`. `auto`, the default, follows the screen.",
      },
    },
  },
  args: { ...requiredProps, mode: "mobile" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("banner")).toBeVisible();
    await expect(canvas.queryByRole("complementary")).not.toBeInTheDocument();
  },
};

export const Desktops: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`mode="desktop"` shows `Sidebar` at any width, with every prop of it: this one starts collapsed.',
      },
    },
  },
  args: { ...requiredProps, mode: "desktop", defaultCollapsed: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("complementary")).toBeVisible();
    await expect(canvas.queryByRole("banner")).not.toBeInTheDocument();
  },
};
