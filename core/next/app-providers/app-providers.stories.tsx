import type { Meta, StoryObj } from "@storybook/react-vite";
import { useSelector } from "react-redux";
import { expect, waitFor } from "storybook/test";
import { MOCK_REDUCERS, MockRouteProvider } from "@test-utils";
import {
  appInitialState,
  Button,
  Text,
  useAppStore,
  useRouterStore,
  useToastStore,
} from "@zljs/core";
import { AppProviders } from "./app-providers";

export default {
  title: "Next/AppProviders",
  component: AppProviders,
  tags: ["autodocs"],
  parameters: { docs: { toc: true } },
} satisfies Meta<typeof AppProviders>;

const Title = () => {
  const value = useSelector((state: { title: string }) => state.title);
  return <Text>{value}</Text>;
};

const Route = () => {
  const urlAsPath = useRouterStore((s) => s.urlAsPath);
  return <Text>{urlAsPath}</Text>;
};

const LoaderButton = () => (
  <Button onClick={() => useAppStore.getState().startFetching()}>
    Start fetching
  </Button>
);

const ToastButton = () => (
  <Button onClick={() => useToastStore.getState().success("Saved")}>
    Show toast
  </Button>
);

type Story = StoryObj<typeof AppProviders>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The app's global configuration: the Redux store around `ZustandProviders`, which brings `Loader`, `Toaster` and, with `auth`, `AuthProvider`, plus the route in `useRouterStore`. It takes `auth` and passes it to `ZustandProviders`. It goes in the app's root layout, around `RootLayout`. A Server Component can't pass a function to a Client Component, so the app keeps its own `'use client'` file that imports its reducers and renders `AppProviders`. It renders no markup of its own.",
      },
    },
  },
  args: {
    children: <Text>App content goes here</Text>,
  },
};

export const Reducers: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`reducers`, `coreReducers`, `middlewares` and `preloadedState` build a store once per mount, so each request on the server gets its own. It has `setDynamicReducers`, so `PageConfig` can add each feature's reducers. Children read the store with `useSelector`.",
      },
    },
  },
  args: {
    reducers: MOCK_REDUCERS,
    children: <Title />,
  },
};

export const Routes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The current path and search go to `useRouterStore` when the path changes, for code outside React or a component that needs them in a store. A navigation that only changes the search doesn't update it, so a component that follows the search uses `useSearchParams` from Next.js.",
      },
    },
  },
  args: {
    children: <Route />,
  },
  decorators: [
    (Story) => (
      <MockRouteProvider pathname="/orders">
        <Story />
      </MockRouteProvider>
    ),
  ],
  play: async ({ canvas }) => {
    await expect(await canvas.findByText(/^\/orders/)).toBeInTheDocument();
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`Loader` follows `useAppStore`, and `Toaster` follows `useToastStore`. They come ready, so a page only calls the stores. This story starts a fetch and shows a toast, so axe checks both.",
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
    <AppProviders>
      <ToastButton />
      <LoaderButton />
    </AppProviders>
  ),
};
