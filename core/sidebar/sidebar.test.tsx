import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Sidebar } from "./sidebar";
import type { SidebarSection, SidebarUser } from "@zljs/core";

vi.mock("next/link", () => ({
  default: ({
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
  }) => <a {...props}>{children}</a>,
}));

const sections: SidebarSection[] = [
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

const user: SidebarUser = {
  name: "Alexandre Mendes",
  email: "alexandregme@zljs.com",
};

const defaultProps = {
  sections,
  user,
  collapseLabel: "Close menu",
  onLogout: vi.fn(),
};

beforeEach(() => {
  defaultProps.onLogout = vi.fn();
});

describe("<Sidebar /> - Default Props", () => {
  it("renders nav with aria-label", () => {
    render(<Sidebar {...defaultProps} />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
  });

  it("renders items as links with correct text", () => {
    render(<Sidebar {...defaultProps} />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Messenger")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
  });

  it("renders icons in items", () => {
    render(<Sidebar {...defaultProps} />);

    expect(screen.getByTestId("Home")).toBeInTheDocument();
    expect(screen.getByTestId("LayoutDashboard")).toBeInTheDocument();
    expect(screen.getByTestId("MessageSquare")).toBeInTheDocument();
    expect(screen.getByTestId("Store")).toBeInTheDocument();
    expect(screen.getByTestId("ShoppingCart")).toBeInTheDocument();
  });

  it("renders multiple sections", () => {
    const { container } = render(<Sidebar {...defaultProps} />);

    const nav = container.querySelector("nav");
    const sectionDivs = nav?.querySelectorAll(":scope > div");

    expect(sectionDivs?.length).toBe(2);
  });

  it("renders user name and email", () => {
    render(<Sidebar {...defaultProps} />);

    expect(screen.getByText("Alexandre Mendes")).toBeInTheDocument();
    expect(screen.getByText("alexandregme@zljs.com")).toBeInTheDocument();
  });

  it("renders avatar with correct initials for two names", () => {
    render(<Sidebar {...defaultProps} />);

    expect(screen.getByText("AM")).toBeInTheDocument();
  });

  it("renders avatar with single initial for one name", () => {
    render(
      <Sidebar
        {...defaultProps}
        user={{ name: "Alexandre", email: "a@test.com" }}
      />,
    );

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders empty avatar for empty name", () => {
    render(
      <Sidebar {...defaultProps} user={{ name: "", email: "a@test.com" }} />,
    );

    const avatarEl = screen
      .getByRole("button", { name: "Logout" })
      .closest("div")
      ?.querySelector("div");

    expect(avatarEl?.textContent).toBe("");
  });

  it("is expanded by default with visible labels", () => {
    render(<Sidebar {...defaultProps} />);

    expect(screen.getByText("Dashboard")).toBeVisible();
    expect(screen.getByText("Alexandre Mendes")).toBeVisible();
  });

  it("renders home link by default", () => {
    render(<Sidebar {...defaultProps} />);

    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute("href", "/");
  });

  it("renders home label when provided", () => {
    render(<Sidebar {...defaultProps} homeLabel="Ruralissima" />);

    expect(screen.getByText("Ruralissima")).toBeInTheDocument();
  });

  it("hides home link when homeHref is false", () => {
    render(<Sidebar {...defaultProps} homeHref={false} />);

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(4);
    expect(links[0]).toHaveAttribute("href", "/dashboard");
  });

  it("renders links with correct href", () => {
    render(<Sidebar {...defaultProps} />);

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(5);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/dashboard");
  });
});

describe("<Sidebar /> - Collapse", () => {
  it("collapses when toggle button is clicked", () => {
    const { container } = render(<Sidebar {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Collapse sidebar" }));

    expect(container.querySelector("aside")).toHaveClass("w-14");
    expect(
      screen.getByRole("button", { name: "Expand sidebar" }),
    ).toBeInTheDocument();
  });

  it("starts collapsed when defaultCollapsed is true", () => {
    const { container } = render(
      <Sidebar {...defaultProps} defaultCollapsed={true} />,
    );

    expect(container.querySelector("aside")).toHaveClass("w-14");
    expect(
      screen.getByRole("button", { name: "Expand sidebar" }),
    ).toBeInTheDocument();
  });

  it("expands back when toggle is clicked twice", () => {
    const { container } = render(<Sidebar {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    fireEvent.click(screen.getByRole("button", { name: "Expand sidebar" }));

    expect(container.querySelector("aside")).toHaveClass("w-64");
    expect(
      screen.getByRole("button", { name: "Collapse sidebar" }),
    ).toBeInTheDocument();
  });

  it("shows Close menu text when expanded", () => {
    render(<Sidebar {...defaultProps} />);

    expect(screen.getByText("Close menu")).toBeInTheDocument();
  });

  it("keeps Close menu text in DOM when collapsed (hidden via CSS)", () => {
    render(<Sidebar {...defaultProps} defaultCollapsed={true} />);

    expect(screen.getByText("Close menu")).toBeInTheDocument();
  });
});

describe("<Sidebar /> - Active & Actions", () => {
  it("highlights active item with aria-current", () => {
    render(<Sidebar {...defaultProps} activeHref="/dashboard" />);

    const activeLink = screen.getByRole("link", { name: /Dashboard/ });

    expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  it("calls onLogout when logout button is clicked", () => {
    const handleLogout = vi.fn();
    render(<Sidebar {...defaultProps} onLogout={handleLogout} />);

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});
