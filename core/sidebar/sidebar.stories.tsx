import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SidebarProps, SidebarSection } from "@zljs/core";
import { appInitialState, useAppStore } from "@zljs/core";
import { focusOutlineContrast, hoverTextContrast } from "@test-utils";
import { expect, fn, within } from "storybook/test";
import { Sidebar } from "./sidebar";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { toc: true },
  },
  // The logout modal opens through `useAppStore`, which every story shares.
  beforeEach: () => {
    useAppStore.setState(appInitialState);
  },
} satisfies Meta<typeof Sidebar>;

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
      { icon: "BarChart3", label: "Reports", href: "/reports" },
    ],
  },
];

const requiredProps: SidebarProps = {
  sections,
  user: { name: "Alexandre Mendes", email: "user@example.com" },
  collapseLabel: "Close menu",
  onLogout: () => {},
};

const nameOf = (control: HTMLElement) =>
  control.getAttribute("aria-label") || control.textContent;

const controlsOf = (canvasElement: HTMLElement) =>
  Array.from(canvasElement.querySelectorAll<HTMLElement>("a, button"));

// An active link has no hover. A control with no text is held to 3:1, as an icon alone.
const expectControlsToHoldContrast = async (canvasElement: HTMLElement) => {
  const controls = controlsOf(canvasElement);
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

// overflow-hidden lets focus scroll a clipped control into view, which moves everything else out of it.
const expectControlsToStayInView = async (canvasElement: HTMLElement) => {
  const controls = controlsOf(canvasElement);
  const outOfView = controls
    .filter((control) => {
      const aside = control.closest("aside") as HTMLElement;

      control.focus();

      const { left, right } = control.getBoundingClientRect();
      const bounds = aside.getBoundingClientRect();
      const moved =
        aside.scrollLeft > 0 || left < bounds.left || right > bounds.right;

      control.blur();
      aside.scrollLeft = 0;

      return moved;
    })
    .map(nameOf);

  await expect(outOfView).toEqual([]);
};

const footerLayoutOf = (canvasElement: HTMLElement) => {
  const [logout, toggle] = Array.from(
    canvasElement.querySelectorAll<HTMLElement>("aside button"),
  ) as [HTMLElement, HTMLElement];

  return {
    footerHeight: logout.parentElement?.offsetHeight,
    logoutTop: logout.getBoundingClientRect().top,
    toggleHeight: toggle.parentElement?.offsetHeight,
    toggleTop: toggle.getBoundingClientRect().top,
    toggleIconLeft: toggle.querySelector("svg")?.getBoundingClientRect().left,
  };
};

const expectIconsToBeCentered = async (canvasElement: HTMLElement) => {
  const aside = canvasElement.querySelector("aside") as HTMLElement;
  const { left, width } = aside.getBoundingClientRect();
  const offCenter = Array.from(aside.querySelectorAll("svg"))
    .map((svg) => svg.getBoundingClientRect())
    .map((icon) => icon.left + icon.width / 2 - (left + width / 2));

  await expect(offCenter).toEqual(offCenter.map(() => 0));
};

// Clicks the toggle and waits for the width and fade to end, so axe doesn't run on a half-faded label.
const toggleSidebar = async (canvasElement: HTMLElement) => {
  const toggle = canvasElement.querySelectorAll<HTMLElement>("aside button")[1];

  toggle?.click();
  await new Promise(requestAnimationFrame);
  await Promise.all(
    canvasElement
      .getAnimations({ subtree: true })
      .map((animation) => animation.finished),
  );
};

const expectFooterToKeepItsLayout = async (canvasElement: HTMLElement) => {
  const collapsed = footerLayoutOf(canvasElement);

  await toggleSidebar(canvasElement);

  const expanded = footerLayoutOf(canvasElement);

  await toggleSidebar(canvasElement);

  await expect(expanded).toEqual(collapsed);
};

type Story = StoryObj<typeof Sidebar>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Only the required props: `sections`, `user`, `collapseLabel` and `onLogout`. Expanded, it is 256px wide with a home link to `/`, and no link is active. It fills the height of the screen, and it is one landmark per page, so each story here renders a single one and shows one value of its prop.",
      },
    },
  },
  args: requiredProps,
};

export const Sections: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Each section is a group of links, separated by a line. Every item needs an `icon`, a `label` and an `href`, which must be unique.",
      },
    },
  },
  args: {
    ...requiredProps,
    sections: [
      ...sections,
      {
        items: [
          { icon: "SiFacebook", label: "Facebook", href: "/facebook" },
          { icon: "SiInstagram", label: "Instagram", href: "/instagram" },
          { icon: "SiWhatsapp", label: "WhatsApp", href: "/whatsapp" },
        ],
      },
    ],
  },
};

export const Users: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The initials come from the first and last names, or the first letter of a single name, and are hidden from screen readers, which read the name beside them. A long name or email is cut with an ellipsis, so it never runs under the logout button.",
      },
    },
  },
  args: {
    ...requiredProps,
    user: {
      name: "Alexandra Maria Fernandes de Oliveira e Albuquerque",
      email: "a.very.long.customer.address@some-long-example-domain.com",
    },
  },
  play: async ({ canvas }) => {
    const email = canvas.getByText(/a\.very\.long/);
    const name = canvas.getByText(/Alexandra Maria/);

    await expect(getComputedStyle(email).textOverflow).toBe("ellipsis");
    await expect(getComputedStyle(name).textOverflow).toBe("ellipsis");
  },
};

export const ActiveHrefs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Each link is a `Link` with `variant="nav"`. The one whose `href` equals `activeHref` gets a lighter background and `aria-current="page"`, also on the home link. Pass the current route. With no `activeHref`, no link is active.',
      },
    },
  },
  args: { ...requiredProps, activeHref: "/messenger" },
  play: async ({ canvasElement }) => {
    await expectControlsToHoldContrast(canvasElement);
  },
};

export const CollapseLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The text of the collapse button, and its accessible name while expanded. Collapsed, the button shows only its icon and is named by `expandLabel`, `Expand sidebar` by default.",
      },
    },
  },
  args: { ...requiredProps, collapseLabel: "Hide navigation" },
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The accessible names with no visible text have English defaults, and an app in another language sets them: `navLabel` names the navigation (`Main navigation`), `logout.label` the logout button (`Sign out`) and `expandLabel` the collapse button while collapsed (`Expand sidebar`). This story is collapsed, so all three are in use.",
      },
    },
  },
  args: {
    ...requiredProps,
    defaultCollapsed: true,
    navLabel: "Menu principal",
    logout: { label: "Sair" },
    expandLabel: "Abrir menu",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("navigation", { name: "Menu principal" }),
    ).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Sair" })).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Abrir menu" }),
    ).toBeVisible();
  },
};

export const Logouts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The logout button is a `SignOutButton`. A click never logs out right away: it opens a modal that asks first, and `onLogout` is called when the user confirms. The app passes the function, so the sidebar works with any auth. When it returns a promise that rejects, an error toast shows, so the app needs a `Toaster`. `logout` takes the texts: `label`, `confirmTitle`, `confirmLabel`, `cancelLabel` and `errorMessage`, all with English defaults. This story opens the modal and confirms, so axe checks it.",
      },
      story: { inline: false, height: "480px" },
    },
  },
  args: {
    ...requiredProps,
    logout: {
      label: "Sair",
      confirmTitle: "Sair da conta?",
      confirmLabel: "Sair agora",
      cancelLabel: "Ficar",
    },
    onLogout: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Sair" }));

    const dialog = await within(document.body).findByRole("dialog", {
      name: "Sair da conta?",
    });

    await expect(args.onLogout).not.toHaveBeenCalled();
    await expect(
      within(dialog).getByRole("button", { name: "Ficar" }),
    ).toBeVisible();

    await userEvent.click(
      within(dialog).getByRole("button", { name: "Sair agora" }),
    );

    await expect(args.onLogout).toHaveBeenCalledTimes(1);
  },
};

export const HomeHrefs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Where the home link goes, `/` by default. `false` removes the home link, as this story shows.",
      },
    },
  },
  args: { ...requiredProps, homeHref: false },
};

export const HomeLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The text beside the home icon, and the link's accessible name. With no `homeLabel` the link shows only the icon and is named `Home`.",
      },
    },
  },
  args: { ...requiredProps, homeLabel: "Enterprise" },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`defaultCollapsed` starts it at 56px, with only the icons and the logout button: the links keep their accessible names, and the avatar, name and email come back when it expands. The user can toggle it either way, and can log out from both states. The home link is active here, so axe also checks that state.",
      },
    },
  },
  args: { ...requiredProps, defaultCollapsed: true, activeHref: "/" },
  play: async ({ canvasElement }) => {
    await expectControlsToHoldContrast(canvasElement);
    await expectControlsToStayInView(canvasElement);
    await expectIconsToBeCentered(canvasElement);
    await expectFooterToKeepItsLayout(canvasElement);
  },
};
