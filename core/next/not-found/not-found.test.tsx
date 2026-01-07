import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NotFound } from "./not-found";

describe("<NotFound /> - Default Props", () => {
  it("renders 404 code", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders default title", () => {
    render(<NotFound />);

    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  it("renders default message", () => {
    render(<NotFound />);

    expect(
      screen.getByText("The page you are looking for does not exist."),
    ).toBeInTheDocument();
  });

  it("renders back link with default href", () => {
    render(<NotFound />);

    const link = screen.getByRole("link", { name: "Go back home" });
    expect(link).toHaveAttribute("href", "/");
  });
});

describe("<NotFound /> - Custom Props", () => {
  it("renders custom title", () => {
    render(<NotFound title="Not Found" />);

    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });

  it("renders custom message", () => {
    render(<NotFound message="Custom message" />);

    expect(screen.getByText("Custom message")).toBeInTheDocument();
  });

  it("renders custom back href", () => {
    render(<NotFound backHref="/dashboard" />);

    const link = screen.getByRole("link", { name: "Go back home" });
    expect(link).toHaveAttribute("href", "/dashboard");
  });
});
