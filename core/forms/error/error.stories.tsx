import type { Meta, StoryObj } from "@storybook/react-vite";
import { Error } from "./error";

const meta: Meta<typeof Error> = {
  title: "Forms/Error",
  component: Error,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Error>;

export const Default: Story = {
  args: {
    message: "This field is required",
  },
};

export const ValidationError: Story = {
  args: {
    message: "Please enter a valid email address",
  },
};

export const Empty: Story = {
  args: {
    message: "",
  },
};
