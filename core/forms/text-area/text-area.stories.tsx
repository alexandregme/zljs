import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./text-area";

const meta: Meta<typeof TextArea> = {
  title: "Forms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: "Description",
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: "Description",
    placeholder: "Enter a description",
  },
};

export const WithValue: Story = {
  args: {
    label: "Description",
    value: "This is some sample text content.",
  },
};

export const WithCustomRows: Story = {
  args: {
    label: "Description",
    placeholder: "Enter a longer description",
    rows: 6,
  },
};

export const WithError: Story = {
  args: {
    label: "Description",
    error: "Description is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Description",
    value: "This field is disabled",
    disabled: true,
  },
};
