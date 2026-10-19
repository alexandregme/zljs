import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
  decorators: [
    (Story) => (
      <div className="inline-flex p-6 rounded-lg bg-neutral-800">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <Spinner variant="circle" />
      <Spinner variant="dots" />
      <Spinner variant="refresh" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};
