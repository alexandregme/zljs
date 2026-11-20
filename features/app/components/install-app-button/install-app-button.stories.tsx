import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { focusOutlineContrast, hoverTextContrast } from "@test-utils";
import { appInitialState, InstallAppButton, useAppStore } from "@zljs/core";

export default {
  title: "Features/InstallAppButton",
  component: InstallAppButton,
  tags: ["autodocs"],
  // An open modal would cover the docs page and trap its focus, and every
  // story shares `useAppStore`: isolate each one.
  parameters: {
    docs: { toc: true, story: { inline: false, height: "360px" } },
  },
  // Every story shares `useAppStore`: one can't start with the modal of another open.
  beforeEach: () => {
    useAppStore.setState(appInitialState);
  },
} satisfies Meta<typeof InstallAppButton>;

const sizes = ["sm", "md", "lg"] as const;

type Story = StoryObj<typeof InstallAppButton>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "An icon button that puts the app on the home screen of the device, to open like an installed app. It gets `way` and `onPrompt` from `useInstallApp`, which knows what the browser can do: render the button only while its `way` isn't `null`. `label` is its accessible name. It takes the color of the text around it, so it works on a light or a dark surface. The browser only offers the install to an app that has a web app manifest.",
      },
    },
  },
  args: { way: "prompt", onPrompt: fn() },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Install app" });

    await expect(focusOutlineContrast(button)).toBeGreaterThanOrEqual(3);
  },
};

export const Ways: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`way` is how the browser installs the app. With `prompt`, a click calls `onPrompt`, which shows the install dialog of the browser, as Chrome on Android has. With `instructions`, for a browser with no dialog to show, such as Safari on an iPhone, a click opens a modal that tells the user the steps, which the button already renders. This story clicks both: the first calls `onPrompt` and the second opens the modal, so axe checks it. It also shows the button on a dark surface.",
      },
    },
  },
  args: { way: "prompt", onPrompt: fn() },
  render: (args) => (
    <div className="flex gap-2 bg-neutral-800 p-4 text-neutral-300">
      <InstallAppButton {...args} way="prompt" label="Install app by prompt" />
      <InstallAppButton
        {...args}
        way="instructions"
        label="Install app by instructions"
      />
    </div>
  ),
  play: async ({ args, canvas, userEvent }) => {
    const byPrompt = canvas.getByRole("button", {
      name: "Install app by prompt",
    });
    const byInstructions = canvas.getByRole("button", {
      name: "Install app by instructions",
    });

    await expect(focusOutlineContrast(byPrompt)).toBeGreaterThanOrEqual(3);
    await expect(hoverTextContrast(byPrompt)).toBeGreaterThanOrEqual(3);

    await userEvent.click(byPrompt);

    await expect(args.onPrompt).toHaveBeenCalledTimes(1);

    await userEvent.click(byInstructions);

    await expect(
      await within(document.body).findByRole("dialog", {
        name: "Install this app",
      }),
    ).toBeVisible();
    await expect(args.onPrompt).toHaveBeenCalledTimes(1);
  },
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`showLabel` shows `label` beside the icon, for a button that is a row of a menu. Without it the button is the icon alone and `label` is only its accessible name. This story shows both on a dark surface.",
      },
    },
  },
  args: { way: "prompt", onPrompt: fn() },
  render: (args) => (
    <div className="flex items-center gap-2 bg-neutral-800 p-4 text-neutral-300">
      <InstallAppButton {...args} label="Install" />
      <InstallAppButton {...args} label="Install app" showLabel />
    </div>
  ),
  play: async ({ canvas }) => {
    const withLabel = canvas.getByRole("button", { name: "Install app" });

    await expect(withLabel).toHaveTextContent("Install app");
    await expect(focusOutlineContrast(withLabel)).toBeGreaterThanOrEqual(3);
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
  args: { way: "prompt", onPrompt: fn() },
  render: (args) => (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <InstallAppButton
          key={size}
          {...args}
          size={size}
          label={`Install app ${size}`}
        />
      ))}
    </div>
  ),
};

export const Texts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Every text has an English default, so an app in another language passes them all: `label`, and `instructionsTitle` and `instructions`, the title and the text of the modal. The default steps are the ones of Safari on an iPhone. This story opens the modal.",
      },
    },
  },
  args: {
    way: "instructions",
    label: "Instalar app",
    instructionsTitle: "Instale este app",
    instructions:
      "Toque em Compartilhar e depois em Adicionar à Tela de Início.",
    onPrompt: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Instalar app" }));

    await expect(
      await within(document.body).findByRole("dialog", {
        name: "Instale este app",
      }),
    ).toBeVisible();
  },
};
