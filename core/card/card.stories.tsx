import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { textContrast } from "@test-utils";
import { Button, Text } from "@zljs/core";
import type { SemanticColor } from "@zljs/core";
import { Card } from "./card";

export default {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { docs: { toc: true } },
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

const COLORS: SemanticColor[] = [
  "none",
  "primary",
  "success",
  "danger",
  "warning",
  "info",
  "muted",
];
const TEXT_MINIMUM = 4.5;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A surface with a border, rounded corners and a soft shadow, which groups what belongs together, such as the options of a sign-in screen. It stacks its children with a gap between them and takes the width of its parent, so the parent sets how wide it is.",
      },
    },
  },
  args: {
    title: "Orders",
    message: "4 orders are waiting to be picked.",
    children: <Button fullWidth>See orders</Button>,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const Header: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`title` and `message` show above the children. `title` is a heading at level 2, and `titleLevel` changes it: 1 when the card is the whole page, as in `Login`. Without both, the card has only its children.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Card title="Title and message" message="The message is muted on white.">
        <Text>Children</Text>
      </Card>
      <Card title="Title only">
        <Text>Children</Text>
      </Card>
      <Card>
        <Text>Children only</Text>
      </Card>
    </div>
  ),
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`color` sets the border, a light background (the color at 15%) and the shadow (the color at 20%), from the `--color-zl-*` theme. The default, `none`, is white with a gray border and a gray shadow. On a color the message drops the muted text, which would be below 4.5:1 there. This story checks the contrast of the message on every color.",
      },
    },
  },
  play: async ({ canvas }) => {
    const lowContrast = canvas
      .getAllByText("The message stays readable.")
      .filter((message) => textContrast(message) < TEXT_MINIMUM)
      .map((message) => message.closest("[data-testid=card]")?.textContent);

    await expect(lowContrast).toEqual([]);
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      {COLORS.map((color) => (
        <Card
          key={color}
          color={color}
          title={color}
          message="The message stays readable."
        >
          <Text>Children</Text>
        </Card>
      ))}
    </div>
  ),
};
