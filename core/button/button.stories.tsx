import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ButtonColor, IconName } from "@zljs/core";
import { Heading } from "@zljs/core";
import { Button } from "./button";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof Button>;

const colors = [
  "primary",
  "success",
  "danger",
  "warning",
  "info",
  "ghost",
  "none",
] as const satisfies readonly ButtonColor[];

const colorIcons: Record<ButtonColor, IconName> = {
  primary: "Send",
  success: "CheckCircle",
  danger: "XCircle",
  warning: "AlertTriangle",
  info: "Info",
  ghost: "Menu",
  none: "Minus",
};

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: "Button",
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={2}>Default</Heading>
      <Heading level={3}>Text only</Heading>
      <div className="flex gap-2 items-center">
        {colors.map((color) => (
          <Button key={color} color={color}>
            {color}
          </Button>
        ))}
      </div>
      <Heading level={3}>With icon</Heading>
      <div className="flex gap-2 items-center">
        {colors.map((color) => (
          <Button key={color} icon={colorIcons[color]} color={color}>
            {color}
          </Button>
        ))}
      </div>
      <Heading level={2}>Link</Heading>
      <Heading level={3}>Text only</Heading>
      <div className="flex gap-2 items-center">
        {colors.map((color) => (
          <Button key={color} variant="link" color={color}>
            {color}
          </Button>
        ))}
      </div>
      <Heading level={3}>With icon</Heading>
      <div className="flex gap-2 items-center">
        {colors.map((color) => (
          <Button
            key={color}
            variant="link"
            icon={colorIcons[color]}
            color={color}
          >
            {color}
          </Button>
        ))}
      </div>
      <Heading level={2}>Icon only</Heading>
      <div className="flex gap-2 items-center">
        <Button icon="X" aria-label="Close" />
        <Button icon={colorIcons.ghost} color="ghost" aria-label="ghost" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={2}>Text only</Heading>
      <div className="flex gap-4 items-center">
        <Button variant="default">Default</Button>
        <Button variant="link">Link</Button>
      </div>
      <Heading level={2}>With icon</Heading>
      <div className="flex gap-4 items-center">
        <Button variant="default" icon="Plus">
          Default
        </Button>
        <Button variant="link" icon="Plus">
          Link
        </Button>
      </div>
      <Heading level={2}>Icon only</Heading>
      <div className="flex gap-4 items-center">
        <Button icon="X" aria-label="Close" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={2}>Text only</Heading>
      <div className="flex gap-2 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <Heading level={2}>With icon</Heading>
      <div className="flex gap-2 items-center">
        <Button size="sm" icon="Plus">
          Small
        </Button>
        <Button size="md" icon="Plus">
          Medium
        </Button>
        <Button size="lg" icon="Plus">
          Large
        </Button>
      </div>
      <Heading level={2}>Icon only</Heading>
      <div className="flex gap-2 items-center">
        <Button size="sm" icon="X" aria-label="Close small" />
        <Button size="md" icon="X" aria-label="Close medium" />
        <Button size="lg" icon="X" aria-label="Close large" />
      </div>
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Button icon="X" aria-label="Close" />
      <Button icon="Plus">Add Item</Button>
      <Button icon="ChevronRight" iconPosition="right">
        Next
      </Button>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button type="button">Button</Button>
      <Button type="submit">Submit</Button>
      <Button type="reset">Reset</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button disabled>Disabled</Button>
      <Button onClick={() => alert("Clicked!")}>Click me</Button>
    </div>
  ),
};
