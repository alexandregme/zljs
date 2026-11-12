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
          'The menu button opens the links under the bar, over the page, one group per section. It turns into a close button, and `aria-expanded` tells a screen reader it is open. A click on a link closes the menu. The link whose `href` equals `activeHref` gets a lighter background and `aria-current="page"`. The list scrolls when it is taller than the screen. This story opens the menu, so axe checks it.',
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
          "The account button opens the name and the email of `user`, with the logout button beside them. A long name or email is cut with an ellipsis. Only one of the two panels is open at a time. The logout button is a `SignOutButton`: a tap opens a modal that asks first, and `onLogout` is called when the user confirms. When it returns a promise that rejects, an error toast shows, so the app needs a `Toaster`. This story opens the account, so axe checks it.",
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

export const Logouts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`logout` takes the texts of the logout button and of its modal: `label`, `confirmTitle`, `confirmLabel`, `cancelLabel` and `errorMessage`, all with English defaults. This story logs out, so axe checks the modal.",
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
    await userEvent.click(canvas.getByRole("button", { name: "Sair" }));

    const dialog = await within(document.body).findByRole("dialog", {
      name: "Sair da conta?",
    });

    await expect(args.onLogout).not.toHaveBeenCalled();

    await userEvent.click(
      within(dialog).getByRole("button", { name: "Sair agora" }),
    );

    await expect(args.onLogout).toHaveBeenCalledTimes(1);
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
