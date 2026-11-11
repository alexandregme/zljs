import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect } from "storybook/test";
import { createMockAuthAdapter, MOCK_APP_ID } from "@test-utils";
import { Button, Text, useAuth } from "@zljs/core";
import { AuthProvider } from "./auth-provider";

export default {
  title: "Auth/AuthProvider",
  component: AuthProvider,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true, story: { inline: false, iframeHeight: 180 } },
  },
} satisfies Meta<typeof AuthProvider>;

const Session = () => {
  const { status, user, role, signInWithOAuth, signOut } = useAuth();

  const signIn = () => {
    void signInWithOAuth("google");
  };

  const leave = () => {
    void signOut();
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Text>{`Status: ${status}`}</Text>
      <Text>{`User: ${user?.email ?? "none"}`}</Text>
      <Text>{`Role: ${role ?? "none"}`}</Text>
      <div className="flex gap-2">
        <Button onClick={signIn}>Sign in with Google</Button>
        <Button onClick={leave}>Sign out</Button>
      </div>
    </div>
  );
};

const SessionExample = () => {
  const [adapter] = useState(() => createMockAuthAdapter());

  return (
    <AuthProvider adapter={adapter} appId={MOCK_APP_ID}>
      <Session />
    </AuthProvider>
  );
};

type Story = StoryObj<typeof AuthProvider>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Keeps the session of an auth provider and gives it to its children through `useAuth`, `Authorized` and `getAuthSession`. It renders no markup of its own. An app has one, around everything that needs the user. The adapter in these stories keeps the session in memory.",
      },
    },
  },
  args: {
    adapter: createMockAuthAdapter(),
    appId: MOCK_APP_ID,
    children: <Session />,
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`adapter` connects zljs to the app's auth provider: the session follows it on sign in, sign out and token refresh. The adapter says whether the user has access to this app (`hasAccess`). `appId` is the key of this app in each user's `roles`, so the same users can sign in to several apps, each with its own role; a user with no role in this app has `role` `null`. While the adapter hasn't answered, `status` is `loading`.",
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await expect(
      canvas.getByText("Status: unauthenticated"),
    ).toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole("button", { name: "Sign in with Google" }),
    );

    await expect(
      await canvas.findByText("Status: authenticated"),
    ).toBeInTheDocument();
    await expect(canvas.getByText("Role: admin")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Sign out" }));

    await expect(
      await canvas.findByText("Status: unauthenticated"),
    ).toBeInTheDocument();
  },
  render: () => <SessionExample />,
};
