import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

export const Default: Story = {
  args: {
    label: "Choose a framework",
    options,
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: "Choose a framework",
    options,
    placeholder: "Select a framework...",
  },
};

export const WithValue: Story = {
  args: {
    label: "Choose a framework",
    options,
    value: "vue",
  },
};

export const Disabled: Story = {
  args: {
    label: "Choose a framework",
    options,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Choose a framework",
    options,
    error: "Please select a framework",
  },
};
