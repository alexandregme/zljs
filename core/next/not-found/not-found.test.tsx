import { render, screen } from "@testing-library/react";
import { NotFound } from "./not-found";

describe("<NotFound /> - Default Props", () => {
  it("renders <NotFound /> correctly", () => {
    render(<NotFound />);
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Page not found",
    });
    const message = screen.getByRole("paragraph");
    const link = screen.getByRole("link", { name: "Go back home" });

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(message).toHaveTextContent(
      "The page you are looking for does not exist.",
    );
    expect(link).toHaveAttribute("href", "/");
  });
});

describe("<NotFound /> - Custom Props", () => {
  it("renders <NotFound /> with all its props", () => {
    render(
      <NotFound
        title="Order not found"
        message="This order does not exist."
        backHref="/orders"
        backLabel="See all orders"
      />,
    );
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Order not found",
    });
    const message = screen.getByRole("paragraph");
    const link = screen.getByRole("link", { name: "See all orders" });

    expect(title).toBeInTheDocument();
    expect(message).toHaveTextContent("This order does not exist.");
    expect(link).toHaveAttribute("href", "/orders");
  });
});
