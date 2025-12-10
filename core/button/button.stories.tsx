import type { Meta, StoryObj } from "@storybook/react";
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
