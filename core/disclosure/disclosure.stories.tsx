import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "@zljs/core";
import { focusOutlineContrast } from "@test-utils";
import { expect } from "storybook/test";
import { Disclosure } from "./disclosure";

export default {
  title: "Components/Disclosure",
  component: Disclosure,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
} satisfies Meta<typeof Disclosure>;

const OUTLINE_MINIMUM = 3;

type Story = StoryObj<typeof Disclosure>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A line that opens and closes what is under it, for content the user reads only sometimes: the orders of a day, the stops of an old route. `summary` is the line that always shows and `children` is what it hides. It is the native `details` element, so it needs no state and the keyboard and screen readers already work. Use the controls to try its props.",
      },
    },
  },
  args: {
    summary: "Monday, 23/11",
    children: "Three orders to deliver",
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`plain`, the default, has no border: use it for a section of a page, where the content under it already has its own look. `outlined` draws a border and a surface background around the summary and the content, for an item of a list that opens in place.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Disclosure summary="Plain" variant="plain">
        <Text>The content sits right under the summary.</Text>
      </Disclosure>
      <Disclosure summary="Outlined" variant="outlined">
        <Text>The content sits inside the border.</Text>
      </Disclosure>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "It starts closed. `defaultOpen` starts it open, for content most users want to see right away, and the user can still close it. It only sets the start: after that the user decides. `summary` takes text or any inline content, such as two `Text` side by side. This story checks 3:1 on the focus outline of each summary, open and closed, because axe doesn't see focus.",
      },
    },
  },
  play: async ({ canvas }) => {
    const lowFocusContrast = canvas
      .getAllByTestId("disclosure-summary")
      .filter((summary) => focusOutlineContrast(summary) < OUTLINE_MINIMUM)
      .map((summary) => summary.textContent);

    await expect(lowFocusContrast).toEqual([]);
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Disclosure summary="Closed">
        <Text>Shows after a click on the summary.</Text>
      </Disclosure>
      <Disclosure summary="Open" defaultOpen>
        <Text>Shows from the start.</Text>
      </Disclosure>
      <Disclosure
        summary={
          <>
            <Text as="span">21/11 15:12</Text>{" "}
            <Text as="span" color="muted">
              2 of 2 delivered
            </Text>
          </>
        }
        defaultOpen
        variant="outlined"
      >
        <Text>A summary made of two texts.</Text>
      </Disclosure>
    </div>
  ),
};
