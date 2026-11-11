import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { MOCK_AUTH_SESSION, MockAuthProvider } from "@test-utils";
import { appInitialState, Authorized, Text, useAppStore } from "@zljs/core";

const NO_ACCESS_SESSION = {
  ...MOCK_AUTH_SESSION,
  user: { ...MOCK_AUTH_SESSION.user, hasAccess: false },
};

const SignedIn: Decorator = (Story) => (
  <MockAuthProvider session={MOCK_AUTH_SESSION}>
    <div className="mx-auto max-w-sm p-4">
      <Story />
    </div>
  </MockAuthProvider>
);

const SignedOut: Decorator = (Story) => (
  <MockAuthProvider>
    <div className="mx-auto max-w-sm p-4">
      <Story />
    </div>
  </MockAuthProvider>
);

const WithoutAccess: Decorator = (Story) => (
  <MockAuthProvider session={NO_ACCESS_SESSION}>
    <div className="mx-auto max-w-sm p-4">
      <Story />
    </div>
  </MockAuthProvider>
);

export default {
  title: "Auth/Authorized",
  component: Authorized,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { toc: true, story: { inline: false, iframeHeight: 420 } },
  },
  args: {
    login: { vendor: "supabase", providers: ["google"] },
    children: <Text>The app</Text>,
  },
  // Every story shares `useAppStore`: one can't start with the modal of another open.
  beforeEach: () => {
    useAppStore.setState(appInitialState);
  },
} satisfies Meta<typeof Authorized>;

type Story = StoryObj<typeof Authorized>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The wall in front of an app: it goes inside `AuthProvider`, around the app, and decides what shows. A signed-out user sees `Login`, a user without access to the app (`hasAccess`) sees `AccessPending`, and a user with access sees the `children`. While the session loads, nothing shows, so the screen doesn't flash. It is for what a screen shows; the API still checks the token on every request. `login` has the props of `Login`, so `vendor` and `providers` are required. Sign in here: the mock user has access, so the app shows.",
      },
    },
  },
  decorators: [SignedOut],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Continue with Google" }),
    );

    await expect(await canvas.findByText("The app")).toBeVisible();
  },
};

export const Screens: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`login` and `accessPending` take the props of `Login` and `AccessPending`, such as their texts. The two screens are only cards, and the wall doesn't center them: that is up to the app. This user is signed in without access.",
      },
    },
  },
  decorators: [WithoutAccess],
  args: {
    login: { vendor: "supabase", providers: ["google"], title: "Entrar" },
    accessPending: {
      title: "Aguardando aprovação",
      message: "Seu acesso ao app ainda não foi liberado.",
      signOutLabel: "Sair",
    },
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 1, name: "Aguardando aprovação" }),
    ).toBeVisible();
  },
};

export const Roles: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Roles are a separate check, on top of access. With `roles`, the user also needs one of them in this app, and one who has none sees `AccessPending`. Without `roles`, access is enough. This user has access and is an `admin`, and the wall asks for a `manager`.",
      },
    },
  },
  decorators: [SignedIn],
  args: { roles: ["manager"] },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 1, name: "Waiting for approval" }),
    ).toBeVisible();
  },
};
