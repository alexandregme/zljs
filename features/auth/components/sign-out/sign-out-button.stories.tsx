import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import {
  focusOutlineContrast,
  hoverTextContrast,
  MOCK_AUTH_SESSION,
  MockAuthProvider,
} from "@test-utils";
import { appInitialState, SignOutButton, useAppStore } from "@zljs/core";

const SignedIn: Decorator = (Story) => (
  <MockAuthProvider session={MOCK_AUTH_SESSION}>
    <Story />
  </MockAuthProvider>
);

export default {
  title: "Auth/SignOutButton",
  component: SignOutButton,
  tags: ["autodocs"],
  // Open modals would cover the docs page and trap its focus, and every story
  // shares `useAppStore`: isolate each one.
  parameters: {
    docs: { toc: true, story: { inline: false, height: "360px" } },
  },
  decorators: [SignedIn],
  // Every story shares `useAppStore`: one can't start with the modal of another open.
  beforeEach: () => {
    useAppStore.setState(appInitialState);
  },
} satisfies Meta<typeof SignOutButton>;

type Story = StoryObj<typeof SignOutButton>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "An icon button that signs the user out through the adapter of `AuthProvider`, so it goes inside it. `label` is its accessible name. It takes the color of the text around it, so it works on a light or a dark surface. `size` is the size of the button, `md` by default: use `lg` on a touch screen. A click never signs out right away: it opens a modal that asks first, which the button already renders, because a wrong tap costs a whole new sign-in.",
      },
    },
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Sign out" });

    await expect(focusOutlineContrast(button)).toBeGreaterThanOrEqual(3);
  },
};

export const Confirmation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The texts of the modal: `confirmTitle` is its question, `confirmLabel` and `cancelLabel` are its two buttons, and `errorMessage` is the toast of a failed sign-out, so the app needs a `Toaster`. This story opens the modal, so axe checks it.",
      },
    },
  },
  args: { confirmTitle: "Sign out of your account?" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Sign out" }));

    const dialog = await within(document.body).findByRole("dialog", {
      name: "Sign out of your account?",
    });

    await expect(
      within(dialog).getByRole("button", { name: "Cancel" }),
    ).toBeInTheDocument();
  },
};

export const Texts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Every text has an English default, so an app in another language passes them all.",
      },
    },
  },
  args: {
    label: "Sair",
    confirmTitle: "Sair da conta?",
    confirmLabel: "Sair",
    cancelLabel: "Cancelar",
    errorMessage: "Não deu pra sair. Tente de novo.",
  },
};

export const OnSignOut: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With `onSignOut`, the button calls the app's own function when the user confirms, instead of the adapter, so it needs no `AuthProvider`: use it in an app whose auth doesn't come from zljs. A function that throws or rejects shows the `errorMessage` toast. This story also shows the button on a dark surface.",
      },
    },
  },
  args: { onSignOut: fn() },
  decorators: [
    (Story) => (
      <div className="bg-neutral-800 p-4 text-neutral-300">
        <Story />
      </div>
    ),
  ],
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Sign out" });

    await expect(focusOutlineContrast(button)).toBeGreaterThanOrEqual(3);
    await expect(hoverTextContrast(button)).toBeGreaterThanOrEqual(3);

    await userEvent.click(button);

    const dialog = await within(document.body).findByRole("dialog", {
      name: "Sign out?",
    });

    await userEvent.click(
      within(dialog).getByRole("button", { name: "Sign out" }),
    );

    await expect(args.onSignOut).toHaveBeenCalledTimes(1);
  },
};
