import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./heading";

export default {
  title: "Components/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof Heading>;

type Story = StoryObj<typeof Heading>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls to try any level and color. Only `children` is required.",
      },
    },
  },
  args: {
    children: "Page Title",
  },
};

export const Levels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`level` sets both the tag (`h1` to `h6`) and the size, from 30px at level 1 (the default) down to 14px at level 6. Pick it by the document outline, not by the size you want, so screen readers can navigate the page.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "With no `color`, the heading inherits the text color around it, and `none` does the same. The other colors are meant for white backgrounds: they hold 4.5:1 contrast there at every level. `muted` is for a secondary heading that shouldn't compete with the main one. An app changes these colors with the `--color-zl-*` theme values, and then checks the contrast of its own choice: only the defaults are checked here.",
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Heading>Default</Heading>
      <Heading color="primary">Primary</Heading>
      <Heading color="success">Success</Heading>
      <Heading color="danger">Danger</Heading>
      <Heading color="warning">Warning</Heading>
      <Heading color="info">Info</Heading>
      <Heading color="muted">Muted</Heading>
      <Heading color="none">None</Heading>
    </div>
  ),
};
