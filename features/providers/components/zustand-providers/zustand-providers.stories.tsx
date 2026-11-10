import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, waitFor } from "storybook/test";
import {
  createMockAuthAdapter,
  MOCK_APP_ID,
  MOCK_AUTH_SESSION,
} from "@test-utils";
import {
  appInitialState,
  Button,
  Text,
  useAppStore,
  useAuth,
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

const Session = () => {
  const { user, role } = useAuth();

  return (
    <Text>{`${user?.email ?? "Signed out"}, role: ${role ?? "none"}`}</Text>
  );
};

const WithAuth = () => {
  const [adapter] = useState(() => createMockAuthAdapter(MOCK_AUTH_SESSION));

  return (
    <ZustandProviders auth={{ adapter, appId: MOCK_APP_ID }}>
      <Session />
    </ZustandProviders>
  );
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Every provider of zljs that needs neither Redux nor a framework, ready and tested: `Loader`, `Toaster` and, with `auth`, `AuthProvider`. `Loader` and `Toaster` are always on, and `auth` turns `AuthProvider` on. It works in any React app; in Next.js, `AppProviders` renders it inside the Redux store, so an app with `AppProviders` passes `auth` to it instead. It renders no markup of its own.",
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
          "`Loader` and `Toaster` are always on, so a page only calls `useAppStore` and `useToastStore`. This story starts a fetch and shows a toast, so axe checks both.",
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

export const Auth: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`auth` takes the `adapter` and the `appId` of `AuthProvider`, so the app doesn't mount it. Without `auth`, nothing of auth is mounted and nothing breaks, until a component calls `useAuth`.",
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(`${MOCK_AUTH_SESSION.user.email}, role: admin`),
    ).toBeInTheDocument();
  },
  render: () => <WithAuth />,
};
