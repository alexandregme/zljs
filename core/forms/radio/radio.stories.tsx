import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./radio";

const meta: Meta<typeof Radio> = {
  title: "Forms/Radio",
  component: Radio,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: "Option 1",
    name: "options",
    value: "option1",
  },
};

export const Checked: Story = {
  args: {
    label: "Selected option",
    name: "options",
    value: "selected",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    name: "options",
    value: "disabled",
    disabled: true,
  },
};

export const RadioGroup: Story = {
  render: () => (
    <div>
      <Radio label="Small" name="size" value="sm" />
      <Radio label="Medium" name="size" value="md" />
      <Radio label="Large" name="size" value="lg" />
    </div>
  ),
};
