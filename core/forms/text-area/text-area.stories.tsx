import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "@zljs/core";
import { colorContrast, focusOutlineContrast } from "@test-utils";
import { expect, fn } from "storybook/test";
import { TextArea } from "./text-area";

export default {
  title: "Forms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof TextArea>;

const onChange = fn();
const onBlur = fn();
const onKeyDown = fn();

type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use the controls to try any prop.",
      },
    },
  },
  args: {
    label: "Description",
  },
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A field needs a name, so the type requires `label` or `aria-label`. Prefer `label`, which everyone can read. Use `aria-label` alone only when the context already says what the field is, such as a reply box under a message. With both, `aria-label` replaces the name, so it has to contain the visible text: voice control users say what they see.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Heading level={2}>label</Heading>
      <TextArea label="Description" />
      <Heading level={2}>aria-label</Heading>
      <TextArea aria-label="Reply to the message" />
      <Heading level={2}>label and aria-label</Heading>
      <TextArea label="Reply" aria-label="Reply to the message" />
    </div>
  ),
};

export const Placeholders: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "An example of what to type, in `gray-500` for 4.84:1 on white, which this story checks. It disappears on typing, so it never replaces the `label`.",
      },
    },
  },
  args: {
    label: "Description",
    placeholder: "Add the details of the order",
  },
  play: async ({ canvas }) => {
    const { color } = getComputedStyle(
      canvas.getByRole("textbox"),
      "::placeholder",
    );

    await expect(colorContrast(color, "#fff")).toBeGreaterThanOrEqual(4.5);
  },
};

export const Rows: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`rows` sets the starting height, and `3` is the default. The user can still drag the field taller or shorter, so pick the height of a typical answer, not a limit.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <TextArea label="Default" />
      <TextArea label="Six rows" rows={6} />
    </div>
  ),
};

export const Errors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`error` shows the message below the field, marks it as invalid and links the message to it, so a screen reader announces both.",
      },
    },
  },
  args: {
    label: "Description",
    error: "Description is required",
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`value` needs `onChange` to stay controlled, and `disabled` blocks editing and takes the field out of the tab order. Keyboard focus draws an outline with 5.25:1 contrast on a white page. This story checks it on every enabled field shown here, along with the border (3:1), which axe doesn't check. Five props have no visual effect. `required` tells assistive technology and the browser that the field is mandatory, so say it in the `label` too, for people who only see the screen. `autoComplete` tells the browser what the field holds, so it can fill it in: use it on fields about the user, such as `street-address`. `name` identifies the value when the form is submitted. `onBlur` runs when the field loses focus: use it to validate after the user leaves the field, not on every key. `onKeyDown` runs on each key press: use it for a shortcut such as Ctrl+Enter to send, and keep Enter for a new line.",
      },
    },
  },
  play: async ({ canvas }) => {
    const enabled = canvas
      .getAllByRole<HTMLTextAreaElement>("textbox")
      .filter((field) => !field.disabled);
    const nameOf = (field: HTMLTextAreaElement) => field.getAttribute("name");
    const lowContrast = enabled
      .filter((field) => focusOutlineContrast(field) < 3)
      .map(nameOf);
    const lowBorderContrast = enabled
      .filter(
        (field) =>
          colorContrast(getComputedStyle(field).borderTopColor, "#fff") < 3,
      )
      .map(nameOf);

    await expect(lowContrast).toEqual([]);
    await expect(lowBorderContrast).toEqual([]);
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <TextArea
        label="Value"
        name="value"
        value="Some sample text."
        onChange={onChange}
      />
      <TextArea
        label="Disabled"
        name="disabled"
        value="Some sample text."
        disabled
      />
      <TextArea label="Required (mandatory)" name="required" required />
      <TextArea label="Address" name="address" autoComplete="street-address" />
      <TextArea
        label="Callbacks"
        name="callbacks"
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  ),
};
