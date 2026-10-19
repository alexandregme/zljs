import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "./tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Playground: Story = {
  args: {
    children: "Status",
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tag color="blue">Blue</Tag>
      <Tag color="green">Green</Tag>
      <Tag color="red">Red</Tag>
      <Tag color="yellow">Yellow</Tag>
      <Tag color="gray">Gray</Tag>
      <Tag color="orange">Orange</Tag>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tag>Static</Tag>
      <Tag onRemove={() => alert("Removed!")}>Removable</Tag>
    </div>
  ),
};
