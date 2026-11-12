import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { restoreBrowserStubs, stubMatchMedia } from "@test-utils";
import { appInitialState, Navigation, useAppStore } from "@zljs/core";
import type { NavigationProps } from "@zljs/core";

const REQUIRED_PROPS: NavigationProps = {
  sections: [
    {
      items: [
        { icon: "LayoutDashboard", label: "Dashboard", href: "/dashboard" },
        { icon: "ShoppingCart", label: "Orders", href: "/orders" },
      ],
    },
  ],
  user: { name: "Alexandre Mendes", email: "user@example.com" },
  collapseLabel: "Close menu",
  onLogout: () => {},
};

const DESKTOP = true;
const MOBILE = false;

const sidebar = () => screen.queryByRole("complementary");
const topNav = () => screen.queryByRole("banner");

afterEach(() => {
  restoreBrowserStubs();
  useAppStore.setState(appInitialState);
});

describe("<Navigation /> - Default Props", () => {
  it("renders <Navigation /> as the sidebar on a wide screen", () => {
    stubMatchMedia(DESKTOP);
    render(<Navigation {...REQUIRED_PROPS} />);

    expect(sidebar()).toBeInTheDocument();
    expect(topNav()).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(
      screen.getByRole("button", { name: "Close menu" }),
    ).toBeInTheDocument();
  });

  it("renders <Navigation /> as the top bar on a narrow screen", () => {
    stubMatchMedia(MOBILE);
    render(<Navigation {...REQUIRED_PROPS} />);

    expect(topNav()).toBeInTheDocument();
    expect(sidebar()).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Account" })).toBeInTheDocument();
  });

  it("renders nothing on the server, where <Navigation /> can't know the screen", () => {
    expect(renderToString(<Navigation {...REQUIRED_PROPS} />)).toBe("");
  });
});

describe("<Navigation /> - Custom Props", () => {
  it("renders <Navigation /> with all the props of the sidebar", () => {
    stubMatchMedia(DESKTOP);
    render(
      <Navigation
        {...REQUIRED_PROPS}
        activeHref="/orders"
        defaultCollapsed
        expandLabel="Abrir menu"
        homeHref="/start"
        homeLabel="Enterprise"
        navLabel="Menu principal"
        logout={{ label: "Sair" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Orders" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("button", { name: "Abrir menu" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Enterprise" })).toHaveAttribute(
      "href",
      "/start",
    );
    expect(
      screen.getByRole("navigation", { name: "Menu principal" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sair" })).toBeInTheDocument();
  });

  it("renders <Navigation /> with all the props of the top bar", () => {
    stubMatchMedia(MOBILE);
    render(
      <Navigation
        {...REQUIRED_PROPS}
        activeHref="/orders"
        homeHref="/start"
        homeLabel="Enterprise"
        navLabel="Menu principal"
        menuLabel="Abrir menu"
        accountLabel="Conta"
        logout={{ label: "Sair" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Enterprise" })).toHaveAttribute(
      "href",
      "/start",
    );

    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));

    expect(
      screen.getByRole("navigation", { name: "Menu principal" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Orders" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    fireEvent.click(screen.getByRole("button", { name: "Conta" }));

    expect(screen.getByRole("button", { name: "Sair" })).toBeInTheDocument();
  });

  it("renders <Navigation /> with mode desktop on a narrow screen", () => {
    stubMatchMedia(MOBILE);
    render(<Navigation {...REQUIRED_PROPS} mode="desktop" />);

    expect(sidebar()).toBeInTheDocument();
    expect(topNav()).not.toBeInTheDocument();
  });

  it("renders <Navigation /> with mode mobile on a wide screen", () => {
    stubMatchMedia(DESKTOP);
    render(<Navigation {...REQUIRED_PROPS} mode="mobile" />);

    expect(topNav()).toBeInTheDocument();
    expect(sidebar()).not.toBeInTheDocument();
  });

  it("swaps <Navigation /> when the screen crosses the width", () => {
    const media = stubMatchMedia(DESKTOP);
    render(<Navigation {...REQUIRED_PROPS} />);

    act(() => {
      media.change(MOBILE);
    });

    expect(topNav()).toBeInTheDocument();
    expect(sidebar()).not.toBeInTheDocument();

    act(() => {
      media.change(DESKTOP);
    });

    expect(sidebar()).toBeInTheDocument();
    expect(topNav()).not.toBeInTheDocument();
  });

  it("stops listening to the screen when <Navigation /> leaves", () => {
    const media = stubMatchMedia(DESKTOP);
    const { unmount } = render(<Navigation {...REQUIRED_PROPS} />);

    expect(media.listeners.size).toBe(1);

    unmount();

    expect(media.listeners.size).toBe(0);
  });

  it("calls onLogout from the <Navigation /> that shows", () => {
    stubMatchMedia(DESKTOP);
    const handleLogout = vi.fn();
    render(<Navigation {...REQUIRED_PROPS} onLogout={handleLogout} />);

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "Sign out",
      }),
    );

    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});
