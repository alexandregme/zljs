import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { focusOutlineContrast, hoverTextContrast } from "@test-utils";
import { setTheme, ThemeToggle } from "@zljs/core";

export default {
  title: "Features/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: { docs: { toc: true } },
  // The theme lives in the browser, which every story shares.
  beforeEach: () => {
    setTheme("system");
  },
} satisfies Meta<typeof ThemeToggle>;

const sizes = ["sm", "md", "lg"] as const;

type Story = StoryObj<typeof ThemeToggle>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Three buttons that change the theme of the app: the one of the system, the default, which follows the device, then light and dark. The one in use is marked. The choice is kept in the browser, so it is the same on the next visit and in every tab, and going back to the system forgets it. `label` is the accessible name of the group. It takes the color of the text around it, so it works on a light or a dark surface. `useTheme` gives the same theme and the function that changes it, for an app that draws its own control.",
      },
    },
  },
  args: { label: "Theme" },
  play: async ({ canvas, userEvent }) => {
    const system = canvas.getByRole("button", { name: "System" });
    const dark = canvas.getByRole("button", { name: "Dark" });

    await expect(focusOutlineContrast(system)).toBeGreaterThanOrEqual(3);
    await expect(hoverTextContrast(dark)).toBeGreaterThanOrEqual(3);

    await userEvent.click(dark);

    await expect(dark).toHaveAttribute("aria-pressed", "true");
    await expect(system).toHaveAttribute("aria-pressed", "false");
    await expect(getComputedStyle(document.documentElement).colorScheme).toBe(
      "dark",
    );
    await expect(focusOutlineContrast(dark)).toBeGreaterThanOrEqual(3);

    await userEvent.click(system);

    await expect(system).toHaveAttribute("aria-pressed", "true");
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`iconOnly` shows one button, for a place with no room for the three, such as a collapsed sidebar. It has the icon of the theme in use, and each click goes to the next: system, light, dark. Its accessible name is `label` and the theme in use, as in `Theme: System`. This story shows both forms on a dark surface and clicks through the three themes.",
      },
    },
  },
  args: { label: "Theme" },
  render: (args) => (
    <div className="flex w-64 flex-col gap-2 bg-neutral-800 p-4 text-neutral-300">
      <ThemeToggle {...args} />
      <div>
        <ThemeToggle {...args} iconOnly />
      </div>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const iconOnly = canvas.getByRole("button", { name: "Theme: System" });
    const light = canvas.getByRole("button", { name: "Light" });

    await expect(focusOutlineContrast(iconOnly)).toBeGreaterThanOrEqual(3);
    await expect(focusOutlineContrast(light)).toBeGreaterThanOrEqual(3);
    await expect(hoverTextContrast(iconOnly)).toBeGreaterThanOrEqual(3);
    await expect(hoverTextContrast(light)).toBeGreaterThanOrEqual(3);

    await userEvent.click(iconOnly);

    await expect(iconOnly).toHaveAccessibleName("Theme: Light");
    await expect(light).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(iconOnly);

    await expect(iconOnly).toHaveAccessibleName("Theme: Dark");

    await userEvent.click(iconOnly);

    await expect(iconOnly).toHaveAccessibleName("Theme: System");
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`size` is the size of the buttons: `sm`, `md` (the default) and `lg`. Use `lg` on a touch screen. The three share the width of the line, each 40px tall.",
      },
    },
  },
  args: { label: "Theme" },
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      {sizes.map((size) => (
        <ThemeToggle key={size} {...args} size={size} label={`Theme ${size}`} />
      ))}
    </div>
  ),
};

export const Texts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`label` is required. The names of the themes have English defaults, so an app in another language passes them too: `systemLabel` (`System`), `lightLabel` (`Light`) and `darkLabel` (`Dark`). The buttons show only icons, so these are their accessible names.",
      },
    },
  },
  args: {
    label: "Tema",
    systemLabel: "Sistema",
    lightLabel: "Claro",
    darkLabel: "Escuro",
  },
  render: (args) => (
    <div className="w-64">
      <ThemeToggle {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("group", { name: "Tema" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Sistema" }),
    ).toHaveAttribute("aria-pressed", "true");
  },
};
