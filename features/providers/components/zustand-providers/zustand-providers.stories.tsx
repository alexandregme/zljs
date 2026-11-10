import { appInitialState } from "@test-utils";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import {
  Button,
  Text,
  useAppStore,
  useToastStore,
  ZustandProviders,
} from "@zljs/core";

export default {
  title: "Providers/ZustandProviders",
  component: ZustandProviders,
  tags: ["autodocs"],
  parameters: { docs: { toc: true } },
} satisfies Meta<typeof ZustandProviders>;

type Story = StoryObj<typeof ZustandProviders>;

const LoaderButton = () => {
  const startFetching = () => {
    useAppStore.getState().startFetching();
  };

  return <Button onClick={startFetching}>Start fetching</Button>;
};

const ToastButton = () => {
  const showToast = () => {
    useToastStore.getState().success("Saved");
  };

  return <Button onClick={showToast}>Show toast</Button>;
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Every provider of zljs that needs neither Redux nor a framework, ready and tested: `Loader` and `Toaster`, always on. It works in any React app; in Next.js, `AppProviders` renders it inside the Redux store. It renders no markup of its own.",
      },
    },
  },
  args: {
    children: <Text>App content goes here</Text>,
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`Loader` follows `useAppStore` and `Toaster` follows `useToastStore`, so a page only calls the stores. This story starts a fetch and shows a toast, so axe checks both.",
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }));

    await waitFor(() => {
      const toasts = document.querySelectorAll(
        '[data-sonner-toast][data-mounted="true"]',
      );
      expect(toasts).toHaveLength(1);
    });

    await userEvent.click(
      canvas.getByRole("button", { name: "Start fetching" }),
    );

    await expect(
      await canvas.findByRole("status", { name: "Loading" }),
    ).toBeVisible();

    useAppStore.setState(appInitialState);
  },
  render: () => (
    <ZustandProviders>
      <ToastButton />
      <LoaderButton />
    </ZustandProviders>
  ),
};
