import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "@zljs/core";
import { expect } from "storybook/test";
import { Error } from "./error";

export default {
  title: "Forms/Error",
  component: Error,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof Error>;

type Story = StoryObj<typeof Error>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls to try any prop. `message` is the text, in the theme's `danger` color, and an empty `message` renders nothing. `Input`, `Select`, `TextArea` and `Checkbox` already show it through their `error` prop, so use it directly only when a field has none.",
      },
    },
  },
  args: {
    message: "This field is required",
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`id` has no visual effect: it lets a field or a group point to the message with `aria-describedby`, so a screen reader announces it there. This story shows the case that needs it, a group of `Radio`, where the error belongs to the `fieldset`.",
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("group")).toHaveAccessibleDescription(
      "Please choose a size",
    );
  },
  render: () => (
    <fieldset aria-describedby="size-error" className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-gray-700">Size</legend>
      <Radio label="Small" name="size" value="sm" />
      <Radio label="Large" name="size" value="lg" />
      <Error id="size-error" message="Please choose a size" />
    </fieldset>
  ),
};
