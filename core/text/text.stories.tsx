import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Playground: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const Elements: Story = {
  render: () => (
    <div className="space-y-4">
      <Text as="p">Paragraph - block text</Text>
      <div>
        <Text as="span">Span - inline text</Text> next to other content
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="body">Body - default text</Text>
      <Text variant="caption">Caption - labels and hints</Text>
      <Text variant="display">{150}</Text>
    </div>
  ),
};
