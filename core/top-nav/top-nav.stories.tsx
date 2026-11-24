import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SidebarSection, TopNavProps } from "@zljs/core";
import { appInitialState, useAppStore } from "@zljs/core";
import { focusOutlineContrast, hoverTextContrast } from "@test-utils";
import { expect, fn, within } from "storybook/test";
import { TopNav } from "./top-nav";

export default {
  title: "Components/TopNav",
  component: TopNav,
  tags: ["autodocs"],
  // The panels open over the page and the logout opens a modal: isolate each
  // story, with room under the bar for them.
  parameters: {
    layout: "fullscreen",
    docs: { toc: true, story: { inline: false, height: "420px" } },
  },
  // The logout modal opens through `useAppStore`, which every story shares.
  beforeEach: () => {
    useAppStore.setState(appInitialState);
  },
} satisfies Meta<typeof TopNav>;

const sections: SidebarSection[] = [
  {
    items: [
      { icon: "LayoutDashboard", label: "Dashboard", href: "/dashboard" },
      { icon: "MessageSquare", label: "Messenger", href: "/messenger" },
      { icon: "Users", label: "Clients", href: "/clients" },
    ],
  },
  {
    items: [
      { icon: "Store", label: "Products", href: "/products" },
      { icon: "ShoppingCart", label: "Orders", href: "/orders" },
    ],
  },
];

const requiredProps: TopNavProps = {
  sections,
  user: { name: "Alexandre Mendes", email: "user@example.com" },
  onLogout: () => {},
};

const nameOf = (control: HTMLElement) =>
  control.getAttribute("aria-label") || control.textContent;

// An active link has no hover. A control with no text is held to 3:1, as an icon alone.
const expectControlsToHoldContrast = async (canvasElement: HTMLElement) => {
  const controls = Array.from(
    canvasElement.querySelectorAll<HTMLElement>("header a, header button"),
  );
  const lowFocusContrast = controls
    .filter((control) => focusOutlineContrast(control) < 3)
    .map(nameOf);
  const lowHoverContrast = controls
    .filter((control) => !control.hasAttribute("aria-current"))
    .filter(
      (control) => hoverTextContrast(control) < (control.textContent ? 4.5 : 3),
    )
    .map(nameOf);

  await expect(lowFocusContrast).toEqual([]);
  await expect(lowHoverContrast).toEqual([]);
};

type Story = StoryObj<typeof TopNav>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The navigation of a small screen, where `Sidebar` doesn't fit: a bar at the top of the page, with the menu button on the left, the home link in the middle and the account button on the right. It takes the same `sections`, `user` and `onLogout` as `Sidebar`, so an app shows one or the other from the same values. It is not fixed to the screen: put it first in a column as tall as the screen, with the page scrolling under it. Closed, only the bar shows, 56px tall.",
      },
    },
  },
  args: requiredProps,
  play: async ({ canvasElement }) => {
    await expectControlsToHoldContrast(canvasElement);
  },
};

export const Menus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The menu button opens the links under the bar, over the page, one group per section. It turns into a close button, and `aria-expanded` tells a screen reader it is open. A click on a link, or anywhere outside the bar and its panel, closes the menu. The link whose `href` equals `activeHref` gets a lighter background and `aria-current="page"`. The list scrolls when it is taller than the screen. This story opens the menu, so axe checks it.',
      },
    },
  },
  args: { ...requiredProps, activeHref: "/messenger" },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const menu = canvas.getByRole("button", { name: "Menu" });

    await userEvent.click(menu);

    const nav = canvas.getByRole("navigation", { name: "Main navigation" });

    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await expect(within(nav).getAllByRole("link")).toHaveLength(5);
    await expect(
      within(nav).getByRole("link", { name: "Messenger" }),
    ).toHaveAttribute("aria-current", "page");
    await expectControlsToHoldContrast(canvasElement);
  },
};

export const WithoutLinks: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With no link in any section, such as `sections={[]}`, there is nothing to open, so the menu button isn't shown. The home link stays in the middle and the account button at the right end. It is for an app whose pages are reached another way, such as a bar of tabs at the bottom, and that only needs the name of the app and the account at the top.",
      },
    },
  },
  args: { ...requiredProps, sections: [], homeLabel: "Enterprise" },
  play: async ({ canvas, canvasElement }) => {
    await expect(
      canvas.queryByRole("button", { name: "Menu" }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Account" }),
    ).toBeInTheDocument();
    await expectControlsToHoldContrast(canvasElement);
  },
};

export const Accounts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The account button opens two rows. The first has what the user can do with the app, one per line: the theme buttons, the share button and, where the browser can install the app, the install button. The second has the name and the email of `user`, with the logout button beside them. A long name or email is cut with an ellipsis. Only one of the two panels is open at a time. The logout button is a `SignOutButton`: a tap opens a modal that asks first, and `onLogout` is called when the user confirms. When it returns a promise that rejects, an error toast shows, so the app needs a `Toaster`. This story opens the account, so axe checks it.",
      },
    },
  },
  args: {
    ...requiredProps,
    user: {
      name: "Alexandra Maria Fernandes de Oliveira e Albuquerque",
      email: "alexandra.fernandes.albuquerque@a-very-long-domain.example.com",
    },
    onLogout: fn(),
  },
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    const account = canvas.getByRole("button", { name: "Account" });

    await userEvent.click(account);

    const name = canvas.getByText(args.user.name);

    await expect(account).toHaveAttribute("aria-expanded", "true");
    await expect(getComputedStyle(name).textOverflow).toBe("ellipsis");
    await expect(
      canvas.getByRole("button", { name: "Sign out" }),
    ).toBeVisible();
    await expectControlsToHoldContrast(canvasElement);
  },
};

export const OutsideClicks: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A click anywhere outside the bar and its open panel closes the panel, the menu or the account alike. The logout modal counts as inside: a click on it leaves the account panel open under it.",
      },
    },
  },
  args: requiredProps,
  play: async ({ canvas, userEvent }) => {
    const menu = canvas.getByRole("button", { name: "Menu" });
    const account = canvas.getByRole("button", { name: "Account" });

    await userEvent.click(menu);
    await userEvent.click(document.body);

    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.queryByRole("navigation")).not.toBeInTheDocument();

    await userEvent.click(account);
    await userEvent.click(document.body);

    await expect(account).toHaveAttribute("aria-expanded", "false");
    await expect(
      canvas.queryByRole("button", { name: "Sign out" }),
    ).not.toBeInTheDocument();
  },
};

export const Logouts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`logout` takes the texts of the logout button and of its modal: `label`, `confirmTitle`, `confirmLabel`, `cancelLabel` and `errorMessage`, all with English defaults. The modal opens over the account panel. This story logs out, so axe checks the modal.",
      },
    },
  },
  args: {
    ...requiredProps,
    accountLabel: "Conta",
    logout: {
      label: "Sair",
      confirmTitle: "Sair da conta?",
      confirmLabel: "Sair agora",
      cancelLabel: "Ficar",
    },
    onLogout: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Conta" }));

    const logout = canvas.getByRole("button", { name: "Sair" });
    // The row of the user, then the panel that holds the rows.
    const panel = logout.parentElement!.parentElement!;

    await userEvent.click(logout);

    const dialog = await within(document.body).findByRole("dialog", {
      name: "Sair da conta?",
    });

    // The modal covers the account panel it was opened from.
    await expect(Number(getComputedStyle(dialog).zIndex)).toBeGreaterThan(
      Number(getComputedStyle(panel).zIndex),
    );
    await expect(args.onLogout).not.toHaveBeenCalled();

    await userEvent.click(
      within(dialog).getByRole("button", { name: "Sair agora" }),
    );

    await expect(args.onLogout).toHaveBeenCalledTimes(1);
  },
};

export const Installs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "On a phone, the account panel gets an install button on its own line, after the share button and over the user and the logout button: it puts the app on the home screen, to open like an installed app. It only shows when the browser can do it. Where the browser offers the install, as Chrome on Android does for an app with a web app manifest, a tap shows the install dialog of the browser. On an iPhone, which has no dialog, a tap opens a modal with the steps. Opened from the home screen, or in a browser that can't install, there is no button. `install` takes its texts: `label`, `instructionsTitle` and `instructions`, all with English defaults. This story sends the offer a browser sends and opens the account, so axe checks the button.",
      },
    },
  },
  args: { ...requiredProps, install: { label: "Instalar app" } },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const prompt = fn();

    window.dispatchEvent(
      Object.assign(new Event("beforeinstallprompt"), { prompt }),
    );
    await userEvent.click(canvas.getByRole("button", { name: "Account" }));

    const install = await canvas.findByRole("button", { name: "Instalar app" });

    await expect(install).toBeVisible();
    await expectControlsToHoldContrast(canvasElement);

    await userEvent.click(install);

    await expect(prompt).toHaveBeenCalledTimes(1);
    await expect(install).not.toBeInTheDocument();
  },
};

export const Themes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The first line of the account panel has the theme buttons, a `ThemeToggle`: the system, the default, which follows the device, then light and dark, with the one in use marked. The choice is kept in the browser. The bar itself follows the theme: a white surface in the light one and a dark surface in the dark one. `theme` takes their texts, `label`, `systemLabel`, `lightLabel` and `darkLabel`, all with English defaults. This story opens the account, chooses the dark theme, checks the contrast of the controls in it and goes back to the system.",
      },
    },
  },
  args: {
    ...requiredProps,
    theme: {
      label: "Tema",
      systemLabel: "Sistema",
      lightLabel: "Claro",
      darkLabel: "Escuro",
    },
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Account" }));

    const system = canvas.getByRole("button", { name: "Sistema" });
    const dark = canvas.getByRole("button", { name: "Escuro" });

    await userEvent.click(dark);

    await expect(dark).toHaveAttribute("aria-pressed", "true");
    await expectControlsToHoldContrast(canvasElement);

    await userEvent.click(system);

    await expect(system).toHaveAttribute("aria-pressed", "true");
  },
};

export const Shares: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The second line of the account panel is the share button, a `ShareAppButton`: it shares the address of the app, so the user can send it to someone who then logs in and asks for access. On a phone a tap opens the share dialog of the browser. In a browser with no share dialog a tap copies the address and a toast says so, so the app needs a `Toaster`. `share` takes its texts, `label`, `copiedMessage` and `errorMessage`, all with English defaults, and what goes with the address: `title`, by default the title of the page, and `text`. The address is always the origin of the page, the app itself. This story gives the browser a share dialog, opens the account and taps.",
      },
    },
  },
  args: {
    ...requiredProps,
    share: {
      label: "Compartilhar app",
      title: "Enterprise",
      text: "Entre e peça acesso.",
    },
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const share = fn(() => Promise.resolve());

    Object.defineProperty(navigator, "share", {
      value: share,
      configurable: true,
    });
    await userEvent.click(canvas.getByRole("button", { name: "Account" }));

    const button = canvas.getByRole("button", { name: "Compartilhar app" });

    await expect(button).toBeVisible();
    await expectControlsToHoldContrast(canvasElement);

    await userEvent.click(button);

    await expect(share).toHaveBeenCalledWith({
      url: window.location.origin,
      title: "Enterprise",
      text: "Entre e peça acesso.",
    });

    Reflect.deleteProperty(navigator, "share");
  },
};

export const Homes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`homeHref` is where the home link goes, `/` by default, and `false` removes it: the two buttons stay at the two ends. `homeLabel` is the text beside the home icon and the name of the link. With no `homeLabel` the link shows only the icon and is named `Home`.",
      },
    },
  },
  args: { ...requiredProps, homeHref: "/start", homeLabel: "Enterprise" },
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The accessible names have English defaults, and an app in another language sets them: `menuLabel` names the menu button (`Menu`), `accountLabel` the account button (`Account`) and `navLabel` the navigation the menu opens (`Main navigation`).",
      },
    },
  },
  args: {
    ...requiredProps,
    menuLabel: "Menu de navegação",
    accountLabel: "Conta",
    navLabel: "Menu principal",
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Menu de navegação" }),
    );

    await expect(
      canvas.getByRole("navigation", { name: "Menu principal" }),
    ).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Conta" })).toBeVisible();
  },
};
