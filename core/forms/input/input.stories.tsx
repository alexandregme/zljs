import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Username",
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    error: "Username is required",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Disabled: Story = {
  args: {
    label: "Username",
    value: "john_doe",
    disabled: true,
  },
};
