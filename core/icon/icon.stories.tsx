import type { Meta, StoryObj } from "@storybook/react-vite";
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

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use the controls to try any icon and size.",
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
