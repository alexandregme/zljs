import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TagColor } from "@zljs/core";
import { Heading } from "@zljs/core";
import {
  focusOutlineContrast,
  hoverTextContrast,
  textContrast,
} from "@test-utils";
import { expect } from "storybook/test";
import { Tag } from "./tag";

export default {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof Tag>;

const colors = [
  "primary",
  "success",
  "danger",
  "warning",
  "info",
  "muted",
  "orange",
  "pink",
  "purple",
] as const satisfies readonly TagColor[];

const TEXT_MINIMUM = 4.5;
const ICON_MINIMUM = 3;
const OUTLINE_MINIMUM = 3;

type Story = StoryObj<typeof Tag>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A short label for a status or a category. Use the controls to try its props.",
      },
    },
  },
  args: {
    children: "Status",
  },
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`primary` is the default. `success`, `danger`, `warning`, `info` and `muted` carry the same meaning as anywhere else in the library. `orange`, `pink` and `purple` carry none: use them to tell categories apart when those meanings don't apply. The background is the color at 15% and the text is its `-strong` value, so a `Tag` follows the `--color-zl-*` theme values, and an app that changes them checks the contrast of its own choice: only the defaults are checked here. The defaults hold on a white page. The remove button takes the text color of the `Tag`. This story checks 4.5:1 on the text at its real size, and on the remove button 3:1 for hover and for the focus outline, because axe sees neither of those.",
      },
    },
  },
  play: async ({ canvas }) => {
    const lowContrast = canvas
      .getAllByTestId("tag")
      .filter((tag) => textContrast(tag) < TEXT_MINIMUM)
      .map((tag) => tag.textContent);
    const removeButtons = canvas.getAllByRole("button");
    const lowFocusContrast = removeButtons
      .filter((button) => focusOutlineContrast(button) < OUTLINE_MINIMUM)
      .map((button) => button.getAttribute("aria-label"));
    const lowHoverContrast = removeButtons
      .filter((button) => hoverTextContrast(button) < ICON_MINIMUM)
      .map((button) => button.getAttribute("aria-label"));

    await expect(lowContrast).toEqual([]);
    await expect(lowFocusContrast).toEqual([]);
    await expect(lowHoverContrast).toEqual([]);
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={2}>Text only</Heading>
      <div className="flex flex-wrap items-center gap-2">
        {colors.map((color) => (
          <Tag key={color} color={color}>
            {color}
          </Tag>
        ))}
      </div>
      <Heading level={2}>With remove button</Heading>
      <div className="flex flex-wrap items-center gap-2">
        {colors.map((color) => (
          <Tag
            key={color}
            color={color}
            onRemove={() => alert(`Removed ${color}!`)}
            removeLabel={`Remove ${color}`}
          >
            {color}
          </Tag>
        ))}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`sm` is the default and the smallest: 12px text. `md` is 14px and `lg` is 16px, each with more padding, for a tag that stands next to larger text, such as a count. The remove button follows the size of the tag.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={2}>Text only</Heading>
      <div className="flex flex-wrap items-center gap-2">
        <Tag size="sm">Small</Tag>
        <Tag size="md">Medium</Tag>
        <Tag size="lg">Large</Tag>
      </div>
      <Heading level={2}>With remove button</Heading>
      <div className="flex flex-wrap items-center gap-2">
        <Tag
          size="sm"
          onRemove={() => alert("Removed!")}
          removeLabel="Remove small"
        >
          Small
        </Tag>
        <Tag
          size="md"
          onRemove={() => alert("Removed!")}
          removeLabel="Remove medium"
        >
          Medium
        </Tag>
        <Tag
          size="lg"
          onRemove={() => alert("Removed!")}
          removeLabel="Remove large"
        >
          Large
        </Tag>
      </div>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`onRemove` adds a remove button. `removeLabel` names that button for screen readers and defaults to `Remover`: pass one that says what is removed when several tags can show at once, so each button has its own name.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Tag>Static</Tag>
      <Tag onRemove={() => alert("Removed!")}>Removable</Tag>
      <Tag onRemove={() => alert("Removed!")} removeLabel="Remove filter Name">
        Name
      </Tag>
    </div>
  ),
};
