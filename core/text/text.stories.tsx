import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./text";

export default {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof Text>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls to try any element, variant and color. Only `children` is required, and it takes a string or a number.",
      },
    },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const As: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`as` sets the element: `p` (the default) for block text, `span` to sit inline next to other content.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "`body` is 16px (the default), `caption` is 14px for labels and hints, and `display` is 30px bold for highlighted values, such as the number in a `StatsCard`.",
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Text variant="body">Body - default text</Text>
      <Text variant="caption">Caption - labels and hints</Text>
      <Text variant="display">{150}</Text>
    </div>
  ),
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With no `color`, the text inherits the color around it, and `none` does the same. The other colors are meant for white backgrounds: they hold 4.5:1 contrast there at every variant. `muted` is for supporting text, such as a progress count or a secondary detail. An app changes these colors with the `--color-zl-*` theme values, and then checks the contrast of its own choice: only the defaults are checked here.",
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Text>Default</Text>
      <Text color="primary">Primary</Text>
      <Text color="success">Success</Text>
      <Text color="danger">Danger</Text>
      <Text color="warning">Warning</Text>
      <Text color="info">Info</Text>
      <Text color="muted">Muted</Text>
      <Text color="none">None</Text>
    </div>
  ),
};
