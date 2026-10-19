import { render, screen } from "@testing-library/react";
import { Spinner } from "@zljs/core";

describe("<Spinner /> - Default Props", () => {
  it("renders <Spinner /> correctly", () => {
    render(<Spinner />);
    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  it("renders <Spinner /> with variant circle by default", () => {
    render(<Spinner />);
    const spinner = screen.getByTestId("spinner");

    expect(spinner).toContainElement(screen.getByTestId("LoaderCircle"));
  });

  it("renders <Spinner /> with size md by default", () => {
    render(<Spinner />);
    const spinner = screen.getByTestId("spinner");

    expect(spinner.querySelector("svg")).toHaveAttribute("width", "16");
  });
});

describe("<Spinner /> - Custom Props", () => {
  it("renders <Spinner /> with variant dots", () => {
    render(<Spinner variant="dots" />);
    const spinner = screen.getByTestId("spinner");

    expect(spinner).toContainElement(screen.getByTestId("Loader"));
  });

  it("renders <Spinner /> with variant refresh", () => {
    render(<Spinner variant="refresh" />);
    const spinner = screen.getByTestId("spinner");

    expect(spinner).toContainElement(screen.getByTestId("RefreshCw"));
  });

  it("renders <Spinner /> with size lg", () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByTestId("spinner");

    expect(spinner.querySelector("svg")).toHaveAttribute("width", "24");
  });
});
