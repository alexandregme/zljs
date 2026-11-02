import { render, screen } from "@testing-library/react";
import { Icon } from "@zljs/core";
import { Link } from "./link";

const HREF = "/orders";

describe("<Link /> - Default Props", () => {
  it("renders <Link /> correctly", () => {
    render(<Link href={HREF}>Orders</Link>);
    const link = screen.getByRole("link", { name: "Orders" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", HREF);
  });
});

describe("<Link /> - Custom Props", () => {
  it("renders <Link /> with children as an element", () => {
    render(
      <Link href={HREF}>
        <Icon name="Package" aria-label="Orders" />
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Orders" });

    expect(link.querySelector("svg")).toBeInTheDocument();
  });
});

describe("<Link /> - Styles", () => {
  it("renders <Link /> with color primary by default", () => {
    render(<Link href={HREF}>Orders</Link>);
    const link = screen.getByRole("link", { name: "Orders" });

    expect(link).toHaveClass("text-zl-primary");
  });

  it("renders <Link /> with color warning", () => {
    render(
      <Link href={HREF} color="warning">
        Orders
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Orders" });

    expect(link).toHaveClass("text-zl-warning");
    expect(link).not.toHaveClass("text-zl-primary");
  });

  it("renders <Link /> with no text color on color none, so it inherits", () => {
    render(
      <Link href={HREF} color="none">
        Orders
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Orders" });

    expect(link.className).not.toContain("text-zl-");
  });

  it("renders <Link /> underlined, so it doesn't rely on color alone", () => {
    render(<Link href={HREF}>Orders</Link>);
    const link = screen.getByRole("link", { name: "Orders" });

    expect(link).toHaveClass("underline");
  });

  it("renders <Link /> with a 44px touch target", () => {
    render(<Link href={HREF}>Orders</Link>);
    const link = screen.getByRole("link", { name: "Orders" });

    expect(link).toHaveClass("relative", "after:h-11", "after:min-w-11");
  });

  it("renders <Link /> with a real focus outline", () => {
    render(<Link href={HREF}>Orders</Link>);
    const link = screen.getByRole("link", { name: "Orders" });

    expect(link).toHaveClass("focus-visible:outline-2");
    expect(link).not.toHaveClass("focus:outline-none");
  });
});
