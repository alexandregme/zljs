import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "@zljs/core";
import { colorContrast, focusOutlineContrast } from "@test-utils";
import { expect, fn } from "storybook/test";
import { Radio } from "./radio";

export default {
  title: "Forms/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof Radio>;

const onChange = fn();
const onBlur = fn();
const onKeyDown = fn();

type Story = StoryObj<typeof Radio>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use the controls to try any prop.",
      },
    },
  },
  args: {
    label: "Option 1",
    name: "options",
    value: "option1",
  },
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A field needs a name, so the type requires `label` or `aria-label`. Prefer `label`, which everyone can read, and which also takes the click. Use `aria-label` alone only when the context already says what the option is, such as a row of a table. With both, `aria-label` replaces the name, so it has to contain the visible text: voice control users say what they see.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Heading level={2}>label</Heading>
      <Radio label="Weekly" name="label" value="weekly" />
      <Heading level={2}>aria-label</Heading>
      <Radio aria-label="Select this row" name="aria-label" value="row" />
      <Heading level={2}>label and aria-label</Heading>
      <Radio
        label="Weekly"
        aria-label="Weekly report"
        name="both"
        value="weekly"
      />
    </div>
  ),
};

export const Names: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Radios with the same `name` form a group: only one can be selected, and the arrow keys move between them. `value` is what the form receives. Wrap a group in a `fieldset` with a `legend`, so a screen reader announces the question along with each option. An error belongs to the group, so `Radio` has no `error`: render `Error` below the group and point `aria-describedby` on the `fieldset` to its `id`.",
      },
    },
  },
  render: () => (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-gray-700">Size</legend>
      <Radio label="Small" name="size" value="sm" />
      <Radio label="Medium" name="size" value="md" />
      <Radio label="Large" name="size" value="lg" />
    </fieldset>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`checked` needs `onChange` to stay controlled, and `disabled` blocks the choice and takes the option out of the tab order. A checked radio uses the theme's `primary` color, at 5.25:1 on white, and keyboard focus draws an outline in the same color. This story checks both on every enabled radio shown here, which axe doesn't do. Three props have no visual effect. `required` tells assistive technology and the browser that the group is mandatory, so say it in the `legend` too, for people who only see the screen. `onBlur` runs when the radio loses focus: use it to validate after the user leaves the group. `onKeyDown` runs on each key press: use it for a shortcut, and leave the arrow keys to the browser.",
      },
    },
  },
  play: async ({ canvas }) => {
    const enabled = canvas
      .getAllByRole<HTMLInputElement>("radio")
      .filter((field) => !field.disabled);
    const nameOf = (field: HTMLInputElement) => field.getAttribute("name");
    const lowContrast = enabled
      .filter((field) => focusOutlineContrast(field) < 3)
      .map(nameOf);
    // "auto" is the browser's own color, and the contrast helper reads it as black, so it can't catch a missing class.
    const lowAccentContrast = enabled
      .filter((field) => {
        const { accentColor } = getComputedStyle(field);

        return accentColor === "auto" || colorContrast(accentColor, "#fff") < 3;
      })
      .map(nameOf);
    const disabledLabel = canvas
      .getByRole("radio", { name: "Disabled" })
      .closest("label") as HTMLLabelElement;

    await expect(lowContrast).toEqual([]);
    await expect(lowAccentContrast).toEqual([]);
    await expect(getComputedStyle(disabledLabel).cursor).toBe("not-allowed");
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Radio
        label="Checked"
        name="checked"
        value="checked"
        checked
        onChange={onChange}
      />
      <Radio label="Disabled" name="disabled" value="disabled" disabled />
      <Radio
        label="Required (mandatory)"
        name="required"
        value="required"
        required
      />
      <Radio
        label="Callbacks"
        name="callbacks"
        value="callbacks"
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  ),
};
