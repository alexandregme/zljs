import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { expect } from "storybook/test";
import { textContrast } from "@test-utils";
import { Button, useAppStore } from "@zljs/core";
import { Loader } from "./loader";

export default {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
  parameters: { docs: { toc: true } },
  decorators: [
    (Story) => (
      <>
        <StartFetching />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof Loader>;

const StartFetching = () => {
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!fetching) return undefined;

    useAppStore.getState().startFetching();
    const timer = setTimeout(() => setFetching(false), 3000);

    return () => {
      clearTimeout(timer);
      useAppStore.getState().finishFetching();
    };
  }, [fetching]);

  const handleClick = () => setFetching(true);

  return <Button onClick={handleClick}>Start fetching</Button>;
};

type Story = StoryObj<typeof Loader>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Covers the page while `useAppStore` has a call in progress, and renders nothing otherwise. A call starts with `startFetching` and ends with `finishFetching`. The button belongs to this page: it starts a call that lasts 3 seconds.",
      },
    },
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`label` has no visual effect: it is the name screen readers announce for the status. Pass it when the app isn't in English, because the default is `Loading`. The spinner uses the `primary` color, which holds 3:1 over the overlay on a white page. An app that changes `primary`, or has a dark page, checks its own contrast.",
      },
    },
  },
  args: {
    label: "Carregando dados",
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Start fetching" }),
    );

    const status = await canvas.findByRole("status", {
      name: "Carregando dados",
    });
    const overlay = status.parentElement!.getBoundingClientRect();

    await expect(overlay.top).toBe(0);
    await expect(overlay.left).toBe(0);
    await expect(overlay.width).toBe(window.innerWidth);
    await expect(overlay.height).toBe(window.innerHeight);
    await expect(textContrast(status)).toBeGreaterThanOrEqual(3);
  },
};
