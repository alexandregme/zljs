import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { focusOutlineContrast, MockAuthProvider } from "@test-utils";
import { Login } from "./login";

const SignedOut: Decorator = (Story) => (
  <MockAuthProvider>
    <div className="mx-auto max-w-sm p-4">
      <Story />
    </div>
  </MockAuthProvider>
);

export default {
  title: "Auth/Login",
  component: Login,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { toc: true, story: { inline: false, iframeHeight: 420 } },
  },
  decorators: [SignedOut],
  args: { vendor: "supabase", providers: ["google"] },
} satisfies Meta<typeof Login>;

type Story = StoryObj<typeof Login>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The sign-in screen of an app, where the user picks how to sign in. It goes inside `AuthProvider` and calls its adapter, and `Authorized` already shows it to a signed-out user, with the props it gets in `login`. It is only the card: a Next app centers it on the screen with `PageWrapper`, from `@alexandregme/zljs/next`. A failed sign-in fires an error toast, so the app needs a `Toaster`.",
      },
    },
  },
  play: async ({ canvas }) => {
    const google = canvas.getByRole("button", { name: "Continue with Google" });

    await expect(focusOutlineContrast(google)).toBeGreaterThanOrEqual(3);
  },
};

export const Providers: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`vendor` is the auth vendor behind the app's adapter, and it sets which `providers` exist: today only `supabase`. `providers` lists the ones the app turned on, one button each, in that order. A click calls `signInWithOAuth` of the adapter with the provider.",
      },
    },
  },
  args: { providers: ["google", "apple", "github", "facebook"] },
};

export const Texts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Every text has an English default, so an app in another language passes them all. `title` is usually the name of the app, and `providerLabel` comes before the name of each provider.",
      },
    },
  },
  args: {
    title: "Ruralíssima",
    message: "Escolha como entrar",
    providerLabel: "Continuar com",
    errorMessage: "Não deu pra entrar. Tente de novo.",
  },
};
