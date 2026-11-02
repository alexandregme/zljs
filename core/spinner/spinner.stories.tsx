import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { textContrast } from "@test-utils";
import { Heading } from "@zljs/core";
import { Spinner } from "./spinner";

export default {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { docs: { toc: true } },
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shows that something is loading, and announces it to screen readers as a status named `Loading`. The default is the `circle` variant at size `md`.",
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`circle` is the default. `dots` and `refresh` only change the icon that spins.",
      },
    },
  },
  render: () => (
    <div className="flex gap-6 items-center">
      <Spinner variant="circle" />
      <Spinner variant="dots" />
      <Spinner variant="refresh" />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "`sm` is 12px, `md` is 16px (the default) and `lg` is 24px.",
      },
    },
  },
  render: () => (
    <div className="flex gap-6 items-center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`label` has no visual effect: it is the name screen readers announce for the status. Pass it when the app isn't in English, because the default is `Loading`. The spinner has no color of its own and inherits it from around it, so whoever renders it on a dark surface sets a light text color there, and checks that the icon holds 3:1.",
      },
    },
  },
  play: async ({ canvas }) => {
    const spinners = canvas.getAllByRole("status");

    await expect(spinners).toHaveLength(2);
    for (const spinner of spinners) {
      await expect(textContrast(spinner)).toBeGreaterThanOrEqual(3);
    }
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Heading level={2}>label</Heading>
      <Spinner label="Carregando dados" />
      <Heading level={2}>On a dark surface</Heading>
      <div className="inline-flex p-6 rounded-lg bg-neutral-800 text-white">
        <Spinner />
      </div>
    </div>
  ),
};
