import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Heading, Tag, Text } from "@zljs/core";
import { colorContrast } from "@test-utils";
import { Checkbox } from "./checkbox";

export default {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof Checkbox>;

const onChange = fn();

const cardLabel = (
  <span className="flex flex-col items-start gap-1">
    <Text as="span">Pro plan</Text>
    <Text as="span" variant="caption">
      Unlimited projects, $12 per month
    </Text>
    <Tag>Most popular</Tag>
  </span>
);

type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use the controls to try every prop.",
      },
    },
  },
  args: {
    label: "Accept terms and conditions",
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`default` (the default) is a box with its text beside it. `card` turns the whole bordered area into the click target, with the box centered on the height of its content, so with several lines the box sits in the middle and not beside the first one. Its `label` can be made of components, and all of their text becomes the accessible name. A `<label>` only takes inline content: use `span`s, `Tag` and `<Text as="span">`, never a `div` or anything interactive such as a `Button`. Keep the pieces apart with a flex `span` or a space, or a screen reader joins them (`Pro planUnlimited projects`).',
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Heading level={2}>Default</Heading>
      <Checkbox label="Accept terms and conditions" />
      <Heading level={2}>Card</Heading>
      <Checkbox variant="card" label="Pro plan" />
      <Heading level={2}>Card with several lines</Heading>
      <Checkbox variant="card" label={cardLabel} />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The size of the box, the text stays the same: `sm` is 14px, `md` is 16px (the default) and `lg` is 20px, for touch screens.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
      <Checkbox size="lg" label="Large" />
    </div>
  ),
};

export const Errors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`error` shows the message below the checkbox, marks it as invalid and links the message to it, so a screen reader announces both.",
      },
    },
  },
  args: {
    label: "Accept terms and conditions",
    error: "You must accept the terms to continue",
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`checked` needs `onChange` to stay controlled, and `disabled` blocks the click on the box and on the label. A checked box uses the theme's `primary` color, at 5.25:1 on white, which this story checks. A `card` shows both on its whole area: a border in that same color when checked, a gray background when disabled. `aria-label` has no visual effect and replaces the name that comes from `label`: use it only to add what the text leaves out, and keep the visible text in it (`Notifications for new comments` for a label reading `Notifications`), because voice control users say what they see. A `card` already reads its whole content, so it doesn't need one.",
      },
    },
  },
  play: async ({ canvas }) => {
    const { accentColor } = getComputedStyle(
      canvas.getByRole("checkbox", { name: "Checked" }),
    );

    // "auto" is the browser's own color, and the contrast helper reads it as black, so it can't catch a missing class.
    await expect(accentColor).not.toBe("auto");
    await expect(colorContrast(accentColor, "#fff")).toBeGreaterThanOrEqual(3);
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Heading level={2}>Default</Heading>
      <Checkbox label="Unchecked" onChange={onChange} />
      <Checkbox label="Checked" checked onChange={onChange} />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled and checked" checked disabled />
      <Checkbox
        label="Notifications"
        aria-label="Notifications for new comments"
        onChange={onChange}
      />
      <Heading level={2}>Card</Heading>
      <Checkbox variant="card" label={cardLabel} checked onChange={onChange} />
      <Checkbox variant="card" label={cardLabel} disabled />
    </div>
  ),
};
