import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading, Text } from "@zljs/core";
import { textContrast } from "@test-utils";
import { expect } from "storybook/test";
import { Icon } from "./icon";
import { iconNames } from "./icon.const";

export default {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
  argTypes: {
    name: {
      control: "select",
      options: iconNames,
    },
  },
} satisfies Meta<typeof Icon>;

const colors = [
  undefined,
  "primary",
  "success",
  "danger",
  "warning",
  "info",
  "muted",
  "none",
] as const;

const ColorRow = ({ name }: { name: "Check" | "SiWhatsapp" }) => (
  <div className="flex flex-wrap gap-4">
    {colors.map((color) => (
      <div
        key={color ?? "default"}
        className="flex flex-col items-center gap-1"
      >
        <Icon name={name} size="lg" color={color} />
        <Text as="span" variant="caption">
          {color ?? "default"}
        </Text>
      </div>
    ))}
  </div>
);

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use the controls to try any icon, size and color.",
      },
    },
  },
  args: {
    name: "Check",
  },
};

export const Names: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Every available icon. UI icons come from `lucide-react` and brand icons (`Si*`) from `react-icons`.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      {iconNames.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            padding: "8px",
            border: "1px solid #eee",
            borderRadius: "4px",
            minWidth: "80px",
          }}
        >
          <Icon name={name} />
          <span style={{ fontSize: "10px" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "`sm` is 12px, `md` is 16px (the default) and `lg` is 24px.",
      },
    },
  },
  render: () => (
    <div className="flex gap-4 items-center">
      <Icon name="Check" size="sm" />
      <Icon name="Check" size="md" />
      <Icon name="Check" size="lg" />
    </div>
  ),
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With no `color`, the icon inherits the color around it, and `none` does the same, so an icon inside a `Button` or a colored text follows it. The other colors are meant for white backgrounds, where they hold 3:1, the minimum for an icon. `muted` is for a supporting icon. An app changes these colors with the `--color-zl-*` theme values, and then checks the contrast of its own choice: only the defaults are checked here. This story measures the contrast because axe doesn't check icons.",
      },
    },
  },
  play: async ({ canvas }) => {
    const lowContrast = canvas
      .getAllByTestId(/^(Check|SiWhatsapp)$/)
      .filter((icon) => textContrast(icon) < 3)
      .map((icon) => icon.className);

    await expect(lowContrast).toEqual([]);
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <Heading level={2}>UI icon</Heading>
        <ColorRow name="Check" />
      </section>
      <section className="flex flex-col gap-2">
        <Heading level={2}>Brand icon</Heading>
        <ColorRow name="SiWhatsapp" />
      </section>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Icons are decorative by default and hidden from screen readers. Pass `aria-label` only when the icon alone carries the information. In an icon-only `Button`, the label goes on the `Button`.",
      },
    },
  },
  render: () => (
    <div className="flex gap-4 items-center">
      <Icon name="AlertTriangle" aria-label="Warning" />
      <Icon name="SiWhatsapp" aria-label="WhatsApp" />
    </div>
  ),
};
