import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  args: {
    children: "Page Title",
    level: 1,
  },
};

export const H2: Story = {
  args: {
    children: "Section Title",
    level: 2,
  },
};

export const H3: Story = {
  args: {
    children: "Subsection Title",
    level: 3,
  },
};

export const H4: Story = {
  args: {
    children: "Small Heading",
    level: 4,
  },
};

export const H5: Story = {
  args: {
    children: "Smaller Heading",
    level: 5,
  },
};

export const H6: Story = {
  args: {
    children: "Smallest Heading",
    level: 6,
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>H1 - Page Title</Heading>
      <Heading level={2}>H2 - Section Title</Heading>
      <Heading level={3}>H3 - Subsection Title</Heading>
      <Heading level={4}>H4 - Small Heading</Heading>
      <Heading level={5}>H5 - Smaller Heading</Heading>
      <Heading level={6}>H6 - Smallest Heading</Heading>
    </div>
  ),
};
