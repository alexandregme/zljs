import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Submit: Story = {
  args: {
    children: "Submit",
    type: "submit",
  },
};

export const Reset: Story = {
  args: {
    children: "Reset",
    type: "reset",
  },
};

export const WithOnClick: Story = {
  args: {
    children: "Click me",
    onClick: () => alert("Clicked!"),
  },
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

export const Colors: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button color="primary">Primary</Button>
      <Button color="success">Success</Button>
      <Button color="danger">Danger</Button>
      <Button color="warning">Warning</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};
