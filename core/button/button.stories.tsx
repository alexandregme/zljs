import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ButtonColor, IconName } from "@zljs/core";
import { Heading } from "@zljs/core";
import { focusOutlineContrast } from "@test-utils/focus";
import { expect } from "storybook/test";
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
  parameters: {
    docs: {
      description: {
        story: "Use the controls to try any prop.",
      },
    },
  },
  args: {
    children: "Button",
  },
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`primary` is the default and `none` is the neutral option. `ghost` takes the text color of its parent, so it works on any background. An icon-only button ignores `color`, except for `ghost`. Keyboard focus draws an outline with at least 3:1 contrast on a white page, and `ghost` keeps it on any background: this story checks every button shown here.",
      },
    },
  },
  play: async ({ canvas }) => {
    const lowContrast = canvas
      .getAllByRole("button")
      .filter((button) => focusOutlineContrast(button) < 3)
      .map((button) => button.textContent || button.getAttribute("aria-label"));

    await expect(lowContrast).toEqual([]);
  },
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
      <Heading level={2}>Ghost on a dark background</Heading>
      <div className="flex gap-2 items-center bg-neutral-800 text-neutral-300 p-4">
        <Button color="ghost">ghost</Button>
        <Button variant="link" color="ghost">
          ghost
        </Button>
        <Button icon={colorIcons.ghost} color="ghost" aria-label="ghost" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`default` is the filled button. `link` looks like text and has a 44px touch target that doesn't change the layout. `icon` is applied automatically when a button has an `icon` and no `children`, unless you pass `variant` to keep another one.",
      },
    },
  },
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
        <Button variant="default" icon="X" aria-label="Close default" />
        <Button variant="link" icon="X" aria-label="Close link" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`md` is the default. Size sets the padding, the text and the icon: 12px on `sm`, 16px on `md` and 24px on `lg`.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          '`icon` takes any `Icon` name and sits on the left by default. `iconPosition="right"` moves it after the text. Without `children`, the button becomes icon-only.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "`button` is the default, so a button inside a form never submits it by accident. Use `submit` or `reset` when it should.",
      },
    },
  },
  render: () => (
    <div className="flex gap-2">
      <Button type="button">Button</Button>
      <Button type="submit">Submit</Button>
      <Button type="reset">Reset</Button>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`disabled` dims the button and blocks `onClick`. `fullWidth` stretches it to the width of its container. `aria-label` names the button for screen readers: it is required on icon-only buttons, and when the button has visible text the label must contain that text.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={2}>Interaction</Heading>
      <div className="flex gap-2">
        <Button disabled>Disabled</Button>
        <Button onClick={() => alert("Clicked!")}>Click me</Button>
      </div>
      <Heading level={2}>Full width</Heading>
      <Button fullWidth>Full width</Button>
      <Heading level={2}>Accessible name</Heading>
      <div className="flex gap-2">
        <Button icon="X" aria-label="Close" />
      </div>
    </div>
  ),
};
