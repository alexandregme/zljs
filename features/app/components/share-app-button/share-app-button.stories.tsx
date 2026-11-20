import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { focusOutlineContrast, hoverTextContrast } from "@test-utils";
import { ShareAppButton, Toaster, useToastStore } from "@zljs/core";

export default {
  title: "Features/ShareAppButton",
  component: ShareAppButton,
  tags: ["autodocs"],
  parameters: { docs: { toc: true } },
  // Every story shares `useToastStore`: one can't start with the toast of another.
  beforeEach: () => {
    useToastStore.setState({ toasts: [] });
  },
} satisfies Meta<typeof ShareAppButton>;

const sizes = ["sm", "md", "lg"] as const;

// Puts a share dialog in the browser of the story, or takes it away, and
// gives the browser back as it was when the story ends.
const stubShare = (share: (() => Promise<void>) | undefined) => {
  Object.defineProperty(navigator, "share", {
    value: share,
    configurable: true,
  });

  return () => {
    Reflect.deleteProperty(navigator, "share");
  };
};

// A clipboard that takes any text, as a browser does on a click of the user.
const stubClipboard = () => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: () => Promise.resolve() },
    configurable: true,
  });

  return () => {
    Reflect.deleteProperty(navigator, "clipboard");
  };
};

type Story = StoryObj<typeof ShareAppButton>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A button that shares the address of the app, so the user can send it to someone who then logs in and asks for access. Where the browser has a share dialog, as a phone does, a click opens it. Where it has none, a click copies the address and a toast says so, so the app needs a `Toaster`. `label` is its text. It takes the color of the text around it, so it works on a light or a dark surface.",
      },
    },
  },
  args: { label: "Share app" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Share app" });

    await expect(focusOutlineContrast(button)).toBeGreaterThanOrEqual(3);
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`iconOnly` shows the icon alone, for a place with no room for the text, such as a collapsed sidebar: `label` is then only the accessible name of the button. Without it the button shows `label` beside the icon. This story shows both on a dark surface.",
      },
    },
  },
  args: { label: "Share app" },
  render: (args) => (
    <div className="flex items-center gap-2 bg-neutral-800 p-4 text-neutral-300">
      <ShareAppButton {...args} label="Share app" />
      <ShareAppButton {...args} label="Share" iconOnly />
    </div>
  ),
  play: async ({ canvas }) => {
    const iconOnly = canvas.getByRole("button", { name: "Share" });
    const withLabel = canvas.getByRole("button", { name: "Share app" });

    await expect(withLabel).toHaveTextContent("Share app");
    await expect(iconOnly).toHaveTextContent("");
    await expect(focusOutlineContrast(iconOnly)).toBeGreaterThanOrEqual(3);
    await expect(focusOutlineContrast(withLabel)).toBeGreaterThanOrEqual(3);
    await expect(hoverTextContrast(iconOnly)).toBeGreaterThanOrEqual(3);
    await expect(hoverTextContrast(withLabel)).toBeGreaterThanOrEqual(4.5);
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`size` is the size of the button: `sm`, `md` (the default) and `lg`. Use `lg` on a touch screen.",
      },
    },
  },
  args: { label: "Share app" },
  render: (args) => (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <ShareAppButton
          key={size}
          {...args}
          size={size}
          label={`Share app ${size}`}
        />
      ))}
    </div>
  ),
};

export const Shares: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The address that is shared is always the origin of the page: the app itself, where it starts, whatever page the user is on. `title` is the title of what is shared, by default the title of the page, and `text` goes with the address, such as how to ask for access. The share dialog of the browser gets the three. When the user closes it, nothing else happens. This story gives the browser a share dialog and clicks.",
      },
    },
  },
  args: {
    label: "Share app",
    title: "Enterprise",
    text: "Log in and ask for access.",
  },
  play: async ({ canvas, userEvent }) => {
    const share = fn(() => Promise.resolve());
    const restore = stubShare(share);

    await userEvent.click(canvas.getByRole("button", { name: "Share app" }));

    await expect(share).toHaveBeenCalledWith({
      url: window.location.origin,
      title: "Enterprise",
      text: "Log in and ask for access.",
    });

    restore();
  },
};

export const Texts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`label` is required. The other texts have English defaults, so an app in another language passes them too: `copiedMessage`, the toast shown when the address is copied (`Link copied`), and `errorMessage`, the toast shown when it could be neither shared nor copied (`Could not share the link`), as on a page without https. This story takes the share dialog from the browser and clicks, so the address is copied and axe checks the toast.",
      },
      story: { inline: false, height: "200px" },
    },
  },
  args: {
    label: "Compartilhar app",
    copiedMessage: "Link copiado",
    errorMessage: "Não foi possível compartilhar o link",
  },
  render: (args) => (
    <>
      <ShareAppButton {...args} />
      <Toaster />
    </>
  ),
  play: async ({ canvas, userEvent }) => {
    const restoreShare = stubShare(undefined);
    const restoreClipboard = stubClipboard();

    await userEvent.click(
      canvas.getByRole("button", { name: "Compartilhar app" }),
    );

    // The toast fades in: axe skips what isn't on the screen yet.
    await waitFor(async () => {
      await expect(
        within(document.body).getByText("Link copiado"),
      ).toBeVisible();
    });

    restoreShare();
    restoreClipboard();
  },
};
