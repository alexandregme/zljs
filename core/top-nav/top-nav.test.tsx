import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import {
  appInitialState,
  TopNav,
  useAppStore,
  useToastStore,
} from "@zljs/core";
import type { SidebarSection, SidebarUser } from "@zljs/core";

const SECTIONS: SidebarSection[] = [
  {
    items: [
      { icon: "LayoutDashboard", label: "Dashboard", href: "/dashboard" },
      { icon: "MessageSquare", label: "Messenger", href: "/messenger" },
    ],
  },
  {
    items: [{ icon: "ShoppingCart", label: "Orders", href: "/orders" }],
  },
];

const USER: SidebarUser = {
  name: "Alexandre Mendes",
  email: "user@example.com",
};

const REQUIRED_PROPS = {
  sections: SECTIONS,
  user: USER,
  onLogout: () => {},
};

const openMenu = (name = "Menu"): void => {
  fireEvent.click(screen.getByRole("button", { name }));
};

const openAccount = (name = "Account"): void => {
  fireEvent.click(screen.getByRole("button", { name }));
};

// The logout modal opens through `useAppStore`, which every test shares.
afterEach(() => {
  useAppStore.setState(appInitialState);
  useToastStore.setState({ toasts: [] });
});

describe("<TopNav /> - Default Props", () => {
  it("renders <TopNav /> correctly", () => {
    render(<TopNav {...REQUIRED_PROPS} />);
    const bar = screen.getByRole("banner");
    const buttons = within(bar).getAllByRole("button");

    expect(bar).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(buttons.map((button) => button.getAttribute("aria-label"))).toEqual([
      "Menu",
      "Account",
    ]);
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: "Account" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByTestId("Menu")).toBeInTheDocument();
    expect(screen.getByTestId("User")).toBeInTheDocument();
  });

  it("renders <TopNav /> without its optional props by default", () => {
    render(<TopNav {...REQUIRED_PROPS} />);

    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("link", { name: "Home" }).children).toHaveLength(1);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.queryByText("Alexandre Mendes")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Sign out" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("<TopNav /> - Custom Props", () => {
  it("renders <TopNav /> with all its props", () => {
    render(
      <TopNav
        {...REQUIRED_PROPS}
        activeHref="/messenger"
        homeHref="/start"
        homeLabel="Enterprise"
        navLabel="Menu principal"
        menuLabel="Abrir menu"
        accountLabel="Conta"
        logout={{
          label: "Sair",
          confirmTitle: "Sair da conta?",
          confirmLabel: "Sair agora",
          cancelLabel: "Ficar",
        }}
      />,
    );
    const homeLink = screen.getByRole("link", { name: "Enterprise" });

    expect(homeLink).toHaveAttribute("href", "/start");
    expect(homeLink).toHaveTextContent("Enterprise");

    openMenu("Abrir menu");
    const nav = screen.getByRole("navigation", { name: "Menu principal" });

    expect(
      within(nav).getByRole("link", { name: "Messenger" }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(nav).getByRole("link", { name: "Dashboard" }),
    ).not.toHaveAttribute("aria-current");

    openAccount("Conta");
    fireEvent.click(screen.getByRole("button", { name: "Sair" }));
    const dialog = screen.getByRole("dialog", { name: "Sair da conta?" });

    expect(
      within(dialog).getByRole("button", { name: "Sair agora" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("button", { name: "Ficar" }),
    ).toBeInTheDocument();
  });

  it("renders <TopNav /> with activeHref on the home link", () => {
    render(<TopNav {...REQUIRED_PROPS} activeHref="/" />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders <TopNav /> without the home link when homeHref is false", () => {
    render(<TopNav {...REQUIRED_PROPS} homeHref={false} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });

  it("opens and closes the links when the menu button of <TopNav /> is clicked", () => {
    render(<TopNav {...REQUIRED_PROPS} />);
    const menu = screen.getByRole("button", { name: "Menu" });

    fireEvent.click(menu);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });

    expect(menu).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("X")).toBeInTheDocument();
    expect(nav.querySelectorAll(":scope > div")).toHaveLength(2);
    expect(
      within(nav)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/dashboard", "/messenger", "/orders"]);
    expect(within(nav).getByTestId("ShoppingCart")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Sign out" }),
    ).not.toBeInTheDocument();

    fireEvent.click(menu);

    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("closes the links of <TopNav /> when one of them is clicked", () => {
    render(<TopNav {...REQUIRED_PROPS} />);

    openMenu();
    fireEvent.click(screen.getByRole("link", { name: "Orders" }));

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("closes the links of <TopNav /> when the home link is clicked", () => {
    render(<TopNav {...REQUIRED_PROPS} />);

    openMenu();
    fireEvent.click(screen.getByRole("link", { name: "Home" }));

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("opens and closes the account when the account button of <TopNav /> is clicked", () => {
    render(<TopNav {...REQUIRED_PROPS} />);
    const account = screen.getByRole("button", { name: "Account" });

    fireEvent.click(account);

    expect(account).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Alexandre Mendes")).toBeInTheDocument();
    expect(screen.getByText("user@example.com")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign out" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

    fireEvent.click(account);

    expect(account).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Alexandre Mendes")).not.toBeInTheDocument();
  });

  it("shows one panel of <TopNav /> at a time", () => {
    render(<TopNav {...REQUIRED_PROPS} />);

    openMenu();
    openAccount();

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.getByText("Alexandre Mendes")).toBeInTheDocument();

    openMenu();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.queryByText("Alexandre Mendes")).not.toBeInTheDocument();
  });

  it("asks before calling onLogout when the logout button of <TopNav /> is clicked", () => {
    const handleLogout = vi.fn();
    render(<TopNav {...REQUIRED_PROPS} onLogout={handleLogout} />);

    openAccount();
    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));
    const dialog = screen.getByRole("dialog", { name: "Sign out?" });

    expect(handleLogout).not.toHaveBeenCalled();

    fireEvent.click(within(dialog).getByRole("button", { name: "Sign out" }));

    expect(handleLogout).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not call onLogout when the logout of <TopNav /> is cancelled", () => {
    const handleLogout = vi.fn();
    render(<TopNav {...REQUIRED_PROPS} onLogout={handleLogout} />);

    openAccount();
    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(handleLogout).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("sends the logout error toast when the onLogout of <TopNav /> rejects", async () => {
    const handleLogout = vi.fn().mockRejectedValue(new Error("offline"));
    render(
      <TopNav
        {...REQUIRED_PROPS}
        logout={{ errorMessage: "Não deu pra sair" }}
        onLogout={handleLogout}
      />,
    );

    openAccount();
    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "Sign out",
      }),
    );

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    expect(useToastStore.getState().toasts[0]?.message).toBe(
      "Não deu pra sair",
    );
  });
});

describe("<TopNav /> - Styles", () => {
  it("renders the active link of <TopNav /> with the active background", () => {
    render(<TopNav {...REQUIRED_PROPS} activeHref="/messenger" />);

    openMenu();

    expect(screen.getByRole("link", { name: "Messenger" })).toHaveClass(
      "bg-neutral-500/30",
    );
    expect(screen.getByRole("link", { name: "Dashboard" })).not.toHaveClass(
      "bg-neutral-500/30",
    );
  });

  it("renders the links of <TopNav /> with a visible focus outline", () => {
    render(<TopNav {...REQUIRED_PROPS} />);

    openMenu();
    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).toHaveClass("focus-visible:outline-2");
      expect(link).not.toHaveClass("focus:outline-none");
    });
  });
});
