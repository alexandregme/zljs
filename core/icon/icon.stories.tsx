import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./icon";
import { iconNames } from "./icon.const";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: iconNames,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "Check",
  },
};

export const Gallery: Story = {
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
