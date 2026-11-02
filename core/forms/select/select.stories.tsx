import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "@zljs/core";
import { colorContrast, focusOutlineContrast } from "@test-utils";
import { expect, fn } from "storybook/test";
import { Select } from "./select";

export default {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof Select>;

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const onChange = fn();
const onBlur = fn();
const onKeyDown = fn();

type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use the controls to try any prop.",
      },
    },
  },
  args: {
    label: "Choose a framework",
    options,
  },
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A field needs a name, so the type requires `label` or `aria-label`. Prefer `label`, which everyone can read. Use `aria-label` alone only when the context already says what the field is, such as a filter above a table. With both, `aria-label` replaces the name, so it has to contain the visible text: voice control users say what they see.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Heading level={2}>label</Heading>
      <Select label="Framework" options={options} />
      <Heading level={2}>aria-label</Heading>
      <Select aria-label="Filter by framework" options={options} />
      <Heading level={2}>label and aria-label</Heading>
      <Select
        label="Framework"
        aria-label="Framework filter"
        options={options}
      />
    </div>
  ),
};

export const Options: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`label` is what the user reads and `value` is what `onChange` receives. They show in the order given. With no `value` and no `placeholder`, the first one starts selected.",
      },
    },
  },
  args: {
    label: "Choose a framework",
    options,
  },
};

export const Placeholders: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With no `value`, the field starts empty and shows the `placeholder`, so the user has to make a choice. It can't be chosen back from the list, and it never replaces the `label`. To show it again in a controlled field, pass `value` as an empty string.",
      },
    },
  },
  args: {
    label: "Choose a framework",
    options,
    placeholder: "Select a framework...",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("combobox")).toHaveDisplayValue(
      "Select a framework...",
    );
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
    label: "Choose a framework",
    options,
    error: "Please select a framework",
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`value` needs `onChange` to stay controlled, and `disabled` blocks editing and takes the field out of the tab order. Keyboard focus draws an outline with 5.25:1 contrast on a white page. This story checks it on every enabled field shown here, along with the border (3:1), which axe doesn't check. Six props have no visual effect. `required` tells assistive technology and the browser that the field is mandatory, so say it in the `label` too, for people who only see the screen, and use it with a `placeholder`: a field that starts on an option is never empty. `autoComplete` tells the browser what the field holds, so it can fill it in: use it on fields about the user, such as `country`. `name` identifies the value when the form is submitted. `onChange` runs when the user picks an option, and `event.target.value` holds its `value`. `onBlur` runs when the field loses focus: use it to validate after the user leaves the field. `onKeyDown` runs on each key press: use it for a shortcut, not to read the value.",
      },
    },
  },
  play: async ({ canvas }) => {
    const enabled = canvas
      .getAllByRole<HTMLSelectElement>("combobox")
      .filter((field) => !field.disabled);
    const nameOf = (field: HTMLSelectElement) => field.getAttribute("name");
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
      <Select
        label="Value"
        name="value"
        options={options}
        value="vue"
        onChange={onChange}
      />
      <Select
        label="Disabled"
        name="disabled"
        options={options}
        value="vue"
        disabled
      />
      <Select
        label="Required (mandatory)"
        name="required"
        options={options}
        placeholder="Select a framework..."
        required
      />
      <Select
        label="Country"
        name="country"
        options={[
          { value: "br", label: "Brazil" },
          { value: "us", label: "United States" },
        ]}
        autoComplete="country"
      />
      <Select
        label="Callbacks"
        name="callbacks"
        options={options}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  ),
};
