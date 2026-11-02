import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "@zljs/core";
import { colorContrast, focusOutlineContrast } from "@test-utils";
import { expect, fn } from "storybook/test";
import { Input } from "./input";

export default {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof Input>;

const onChange = fn();
const onBlur = fn();
const onKeyDown = fn();

type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use the controls to try any prop.",
      },
    },
  },
  args: {
    label: "Username",
  },
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A field needs a name, so the type requires `label` or `aria-label`. Prefer `label`, which everyone can read. Use `aria-label` alone only when the context already says what the field is, such as a search box beside its button. With both, `aria-label` replaces the name, so it has to contain the visible text: voice control users say what they see.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Heading level={2}>label</Heading>
      <Input label="Username" />
      <Heading level={2}>aria-label</Heading>
      <Input aria-label="Search the table" />
      <Heading level={2}>label and aria-label</Heading>
      <Input label="Search" aria-label="Search the table" />
    </div>
  ),
};

export const Types: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`text` is the default. `email` brings the email keyboard on phones, and `password` hides what is typed.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Input label="Text" type="text" />
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
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
    label: "Email",
    placeholder: "name@example.com",
  },
  play: async ({ canvas }) => {
    const { color } = getComputedStyle(
      canvas.getByRole("textbox"),
      "::placeholder",
    );

    await expect(colorContrast(color, "#fff")).toBeGreaterThanOrEqual(4.5);
  },
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
    label: "Username",
    error: "Username is required",
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`value` needs `onChange` to stay controlled, and `disabled` blocks editing and takes the field out of the tab order. Keyboard focus draws an outline with 5.25:1 contrast on a white page. This story checks it on every enabled field shown here, along with the border (3:1), which axe doesn't check. Five props have no visual effect. `required` tells assistive technology and the browser that the field is mandatory, so say it in the `label` too, for people who only see the screen. `autoComplete` tells the browser what the field holds, so it can fill it in: use it on fields about the user, such as `email` or `current-password`. `name` identifies the value when the form is submitted. `onBlur` runs when the field loses focus: use it to validate after the user leaves the field, not on every key. `onKeyDown` runs on each key press: use it for a shortcut such as Enter to search, not to read the value, which is what `onChange` is for.",
      },
    },
  },
  play: async ({ canvas }) => {
    const fields = [
      ...canvas.getAllByRole("textbox"),
      canvas.getByLabelText("Password"),
    ];
    const enabled = fields.filter(
      (field) => !(field as HTMLInputElement).disabled,
    );
    const nameOf = (field: HTMLElement) => field.getAttribute("name");
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
      <Input label="Value" name="value" value="john_doe" onChange={onChange} />
      <Input label="Disabled" name="disabled" value="john_doe" disabled />
      <Input label="Required (mandatory)" name="required" required />
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
      />
      <Input
        label="Callbacks"
        name="callbacks"
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  ),
};
