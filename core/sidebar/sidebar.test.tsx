import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import {
  appInitialState,
  Sidebar,
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
    items: [
      { icon: "Store", label: "Products", href: "/products" },
      { icon: "ShoppingCart", label: "Orders", href: "/orders" },
    ],
  },
];

const USER: SidebarUser = {
  name: "Alexandre Mendes",
  email: "user@example.com",
};

const COLLAPSE_LABEL = "Close menu";

const REQUIRED_PROPS = {
  sections: SECTIONS,
  user: USER,
  collapseLabel: COLLAPSE_LABEL,
  onLogout: () => {},
};

// The logout modal opens through `useAppStore`, which every test shares.
afterEach(() => {
  act(() => {
    useAppStore.setState(appInitialState);
    useToastStore.setState({ toasts: [] });
  });
});

describe("<Sidebar /> - Default Props", () => {
  it("renders <Sidebar /> correctly", () => {
    render(<Sidebar {...REQUIRED_PROPS} />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    const links = screen.getAllByRole("link");

    expect(nav).toBeInTheDocument();
    expect(nav.querySelectorAll(":scope > div")).toHaveLength(2);
    expect(links).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(screen.getByRole("link", { name: "Orders" })).toHaveAttribute(
      "href",
      "/orders",
    );
    expect(screen.getByTestId("Home")).toBeInTheDocument();
    expect(screen.getByTestId("LayoutDashboard").parentElement).toBe(
      screen.getByRole("link", { name: "Dashboard" }),
    );
    expect(screen.getByTestId("ShoppingCart")).toBeInTheDocument();
    expect(screen.getByText("Alexandre Mendes")).toBeInTheDocument();
    expect(screen.getByText("user@example.com")).toBeInTheDocument();
    expect(screen.getAllByTestId("text")).toHaveLength(6);
    expect(screen.getByText("AM")).toHaveAttribute("aria-hidden", "true");
    expect(
      screen.getByRole("button", { name: COLLAPSE_LABEL }),
    ).toHaveTextContent(COLLAPSE_LABEL);
    expect(
      screen.getByRole("button", { name: "Sign out" }),
    ).toBeInTheDocument();
  });

  it("renders <Sidebar /> without its optional props by default", () => {
    render(<Sidebar {...REQUIRED_PROPS} />);
    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).not.toHaveAttribute("aria-current");
    });
    expect(screen.getByRole("link", { name: "Home" }).children).toHaveLength(1);
    expect(
      screen.queryByRole("button", { name: "Expand sidebar" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("<Sidebar /> - Custom Props", () => {
  it("renders <Sidebar /> with all its props", () => {
    render(
      <Sidebar
        {...REQUIRED_PROPS}
        activeHref="/dashboard"
        homeHref="/start"
        homeLabel="Enterprise"
        navLabel="Menu principal"
      />,
    );
    const homeLink = screen.getByRole("link", { name: "Enterprise" });

    expect(
      screen.getByRole("navigation", { name: "Menu principal" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(homeLink).toHaveAttribute("href", "/start");
    expect(homeLink).toHaveTextContent("Enterprise");
    expect(homeLink.children).toHaveLength(2);
    expect(screen.getAllByTestId("text")).toHaveLength(7);
    expect(homeLink).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Messenger" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("renders <Sidebar /> with a user with one name", () => {
    render(
      <Sidebar
        {...REQUIRED_PROPS}
        user={{ name: "Alexandre", email: "a@test.com" }}
      />,
    );

    expect(screen.getByText("A")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders <Sidebar /> with a user with an empty name", () => {
    render(
      <Sidebar {...REQUIRED_PROPS} user={{ name: "", email: "a@test.com" }} />,
    );
    const footer = screen.getByRole("button", {
      name: "Sign out",
    }).parentElement;

    expect(footer?.querySelector('[aria-hidden="true"]')).toHaveTextContent("");
  });

  it("renders <Sidebar /> with activeHref on the home link", () => {
    render(<Sidebar {...REQUIRED_PROPS} activeHref="/" />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders <Sidebar /> with defaultCollapsed", () => {
    render(<Sidebar {...REQUIRED_PROPS} defaultCollapsed />);

    expect(
      screen.getByRole("button", { name: "Expand sidebar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign out" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    expect(screen.queryByText(COLLAPSE_LABEL)).not.toBeInTheDocument();
    expect(screen.queryByText("AM")).not.toBeInTheDocument();
    expect(screen.queryByText("Alexandre Mendes")).not.toBeInTheDocument();
    expect(screen.queryByText("user@example.com")).not.toBeInTheDocument();
  });

  it("renders <Sidebar /> with expandLabel", () => {
    render(
      <Sidebar {...REQUIRED_PROPS} defaultCollapsed expandLabel="Abrir menu" />,
    );

    expect(
      screen.getByRole("button", { name: "Abrir menu" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Expand sidebar" }),
    ).not.toBeInTheDocument();
  });

  it("renders <Sidebar /> without the home link when homeHref is false", () => {
    render(<Sidebar {...REQUIRED_PROPS} homeHref={false} />);
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(4);
    expect(
      screen.queryByRole("link", { name: "Home" }),
    ).not.toBeInTheDocument();
  });

  it("toggles <Sidebar /> when the collapse button is clicked", () => {
    render(<Sidebar {...REQUIRED_PROPS} />);

    fireEvent.click(screen.getByRole("button", { name: COLLAPSE_LABEL }));

    expect(screen.queryByText("Alexandre Mendes")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Expand sidebar" }));

    expect(screen.getByText("Alexandre Mendes")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: COLLAPSE_LABEL }),
    ).toBeInTheDocument();
  });

  it("asks before calling onLogout when the logout button of <Sidebar /> is clicked", () => {
    const handleLogout = vi.fn();
    render(<Sidebar {...REQUIRED_PROPS} onLogout={handleLogout} />);

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));
    const dialog = screen.getByRole("dialog", { name: "Sign out?" });

    expect(
      within(dialog).getByRole("button", { name: "Cancel" }),
    ).toBeInTheDocument();
    expect(handleLogout).not.toHaveBeenCalled();

    fireEvent.click(within(dialog).getByRole("button", { name: "Sign out" }));

    expect(handleLogout).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not call onLogout when the logout of <Sidebar /> is cancelled", () => {
    const handleLogout = vi.fn();
    render(<Sidebar {...REQUIRED_PROPS} onLogout={handleLogout} />);

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(handleLogout).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onLogout from a collapsed <Sidebar />", () => {
    const handleLogout = vi.fn();
    render(
      <Sidebar {...REQUIRED_PROPS} defaultCollapsed onLogout={handleLogout} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "Sign out",
      }),
    );

    expect(handleLogout).toHaveBeenCalledTimes(1);
  });

  it("renders the logout question of <Sidebar /> with its custom texts", () => {
    render(
      <Sidebar
        {...REQUIRED_PROPS}
        logout={{
          label: "Sair",
          confirmTitle: "Sair da conta?",
          confirmLabel: "Sair agora",
          cancelLabel: "Ficar",
        }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Sair" }));
    const dialog = screen.getByRole("dialog", { name: "Sair da conta?" });

    expect(
      within(dialog).getByRole("button", { name: "Sair agora" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("button", { name: "Ficar" }),
    ).toBeInTheDocument();
  });
  it("sends the logout error toast when the onLogout of <Sidebar /> rejects", async () => {
    const handleLogout = vi.fn().mockRejectedValue(new Error("offline"));
    render(
      <Sidebar
        {...REQUIRED_PROPS}
        logout={{ errorMessage: "Não deu pra sair" }}
        onLogout={handleLogout}
      />,
    );

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

describe("<Sidebar /> - Styles", () => {
  it("renders <Sidebar /> expanded by default", () => {
    const { container } = render(<Sidebar {...REQUIRED_PROPS} />);
    const footer = screen.getByRole("button", {
      name: "Sign out",
    }).parentElement;

    expect(container.querySelector("aside")).toHaveClass("w-64");
    expect(footer).not.toHaveClass("justify-center");
  });

  it("renders <Sidebar /> with defaultCollapsed", () => {
    const { container } = render(
      <Sidebar {...REQUIRED_PROPS} defaultCollapsed />,
    );
    const footer = screen.getByRole("button", {
      name: "Sign out",
    }).parentElement;

    expect(container.querySelector("aside")).toHaveClass("w-14");
    expect(footer).toHaveClass("justify-center");
  });

  it("renders the active links of <Sidebar /> with the active background", () => {
    render(<Sidebar {...REQUIRED_PROPS} activeHref="/dashboard" />);

    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveClass(
      "bg-neutral-500/30",
    );
    expect(screen.getByRole("link", { name: "Messenger" })).not.toHaveClass(
      "bg-neutral-500/30",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveClass(
      "bg-neutral-500/30",
    );
  });

  it("renders the home link of <Sidebar /> with the active background when active", () => {
    render(<Sidebar {...REQUIRED_PROPS} activeHref="/" />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveClass(
      "bg-neutral-500/30",
    );
  });

  it("renders the links of <Sidebar /> with a visible focus outline", () => {
    render(<Sidebar {...REQUIRED_PROPS} />);
    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).toHaveClass("focus-visible:outline-2");
      expect(link).not.toHaveClass("focus:outline-none");
    });
  });
});
