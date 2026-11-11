import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { MOCK_AUTH_SESSION, MockAuthProvider } from "@test-utils";
import { AccessPending, appInitialState, useAppStore } from "@zljs/core";

const SignedIn: Decorator = (Story) => (
  <MockAuthProvider session={MOCK_AUTH_SESSION}>
    <div className="mx-auto max-w-sm p-4">
      <Story />
    </div>
  </MockAuthProvider>
);

export default {
  title: "Auth/AccessPending",
  component: AccessPending,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { toc: true, story: { inline: false, iframeHeight: 420 } },
  },
  decorators: [SignedIn],
  // Every story shares `useAppStore`: one can't start with the modal of another open.
  beforeEach: () => {
    useAppStore.setState(appInitialState);
  },
} satisfies Meta<typeof AccessPending>;

type Story = StoryObj<typeof AccessPending>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The screen of a user who signed in and has no access to the app yet, such as while an admin hasn't approved them. It shows the email of the account, so the user knows which one is waiting, and a `SignOutButton` to change accounts. It goes inside `AuthProvider`. `Authorized` already shows it, with the props it gets in `accessPending`. It is only the card: a Next app centers it on the screen with `PageWrapper`, from `@alexandregme/zljs/next`.",
      },
    },
  },
};

export const Texts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Every text has an English default, so an app in another language passes them all. `title` and `message` are the screen's. `signOutLabel` names the button, and `confirmTitle`, `confirmLabel`, `cancelLabel` and `errorMessage` go to the modal it opens. This story opens the modal, so axe checks it.",
      },
    },
  },
  args: {
    title: "Aguardando aprovação",
    message: "Seu acesso ao app ainda não foi liberado.",
    signOutLabel: "Sair",
    confirmTitle: "Sair da conta?",
    confirmLabel: "Sair",
    cancelLabel: "Cancelar",
    errorMessage: "Não deu pra sair. Tente de novo.",
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Sair" }));

    const dialog = await within(document.body).findByRole("dialog", {
      name: "Sair da conta?",
    });

    await expect(
      within(dialog).getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
  },
};
