import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SemanticColor } from "@zljs/core";
import { Heading, Icon, Text } from "@zljs/core";
import {
  focusOutlineContrast,
  hoverTextContrast,
  textContrast,
} from "@test-utils";
import { expect } from "storybook/test";
import { Link } from "./link";

export default {
  title: "Next/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof Link>;

const colors = [
  "primary",
  "success",
  "danger",
  "warning",
  "info",
  "muted",
  "none",
] as const satisfies readonly SemanticColor[];

type Story = StoryObj<typeof Link>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls to try any color. It navigates with `next/link`, inherits the font size around it and is always underlined, so it doesn't rely on color alone. It has a 44px touch target that doesn't change the layout: at 24px tall, it reaches 10px above and below the link, so keep at least 20px between stacked links, otherwise a tap on one opens the other.",
      },
    },
  },
  args: {
    children: "Link",
    href: "/",
  },
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`primary` is the default. `none` inherits the color around it, so it works on any background. The other colors are meant for white backgrounds, where text holds 4.5:1 and keyboard focus draws an outline with at least 3:1, also on hover. `muted` is for a secondary link. An app changes these colors with the `--color-zl-*` theme values, and then checks the contrast of its own choice: only the defaults are checked here. This story measures hover and focus because axe sees neither.",
      },
    },
  },
  play: async ({ canvas }) => {
    const links = canvas.getAllByRole("link");
    const nameOf = (link: HTMLElement) => link.textContent;

    await expect(
      links.filter((link) => textContrast(link) < 4.5).map(nameOf),
    ).toEqual([]);
    await expect(
      links.filter((link) => hoverTextContrast(link) < 4.5).map(nameOf),
    ).toEqual([]);
    await expect(
      links.filter((link) => focusOutlineContrast(link) < 3).map(nameOf),
    ).toEqual([]);
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={2}>On white</Heading>
      <div className="flex gap-4 items-center">
        {colors.map((color) => (
          <Link key={color} href="/" color={color}>
            {color}
          </Link>
        ))}
      </div>
      <Heading level={2}>None on a dark background</Heading>
      <div className="flex gap-4 items-center bg-neutral-800 text-neutral-300 p-4">
        <Link href="/" color="none">
          none
        </Link>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`inline`, the default, is a link in a text. `nav` is a row of a menu: 40px tall, as wide as its parent, with no underline, an icon and a label side by side, and a translucent background on hover that works on a light or a dark surface. `active` marks the link to the current page: it sets `aria-current="page"` on both variants, and a `nav` link also gets a background. A `nav` link whose children have no text, such as only an icon, takes its name from `aria-label`. `onClick` is called on a click, before the navigation, such as to close the menu the link is in. `Sidebar` and `TopNav` are built from these.',
      },
    },
  },
  play: async ({ canvas }) => {
    const links = canvas.getAllByRole("link");
    const nameOf = (link: HTMLElement) =>
      link.getAttribute("aria-label") || link.textContent;

    await expect(
      links.filter((link) => focusOutlineContrast(link) < 3).map(nameOf),
    ).toEqual([]);
    await expect(
      links
        .filter((link) => !link.hasAttribute("aria-current"))
        .filter((link) => hoverTextContrast(link) < 4.5)
        .map(nameOf),
    ).toEqual([]);
    await expect(canvas.getByRole("link", { name: "Orders" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={2}>Inline</Heading>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/current" active>
          Current page
        </Link>
      </div>
      <Heading level={2}>Nav</Heading>
      <nav aria-label="On white" className="grid w-64 gap-1">
        <Link href="/products" variant="nav" color="none">
          <Icon name="Store" />
          <Text as="span" variant="caption">
            Products
          </Text>
        </Link>
        <Link href="/orders" variant="nav" color="none" active>
          <Icon name="ShoppingCart" />
          <Text as="span" variant="caption">
            Orders
          </Text>
        </Link>
      </nav>
      <nav
        aria-label="On a dark background"
        className="grid w-64 gap-1 bg-neutral-800 p-2 text-neutral-300"
      >
        <Link href="/reports" variant="nav" color="none">
          <Icon name="BarChart3" />
          <Text as="span" variant="caption">
            Reports
          </Text>
        </Link>
        <Link href="/clients" variant="nav" color="none" aria-label="Clients">
          <Icon name="Users" />
        </Link>
      </nav>
    </div>
  ),
};
