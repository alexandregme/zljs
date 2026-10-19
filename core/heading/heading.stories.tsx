import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Playground: Story = {
  args: {
    children: "Page Title",
  },
};

export const Levels: Story = {
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

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={2}>Default</Heading>
      <Heading level={2} color="primary">
        Primary
      </Heading>
      <Heading level={2} color="success">
        Success
      </Heading>
      <Heading level={2} color="danger">
        Danger
      </Heading>
      <Heading level={2} color="warning">
        Warning
      </Heading>
      <Heading level={2} color="info">
        Info
      </Heading>
      <Heading level={2} color="none">
        None
      </Heading>
    </div>
  ),
};
