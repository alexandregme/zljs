import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Heading } from "./heading";

describe("<Heading /> - Default Props", () => {
  it("renders Heading correctly", () => {
    render(<Heading>Page Title</Heading>);

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders as h1 by default", () => {
    render(<Heading>Page Title</Heading>);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders children text", () => {
    render(<Heading>Page Title</Heading>);

    expect(screen.getByText("Page Title")).toBeInTheDocument();
  });
});

describe("<Heading /> - Custom Props", () => {
  it("renders as h1", () => {
    render(<Heading level={1}>Title</Heading>);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders as h2", () => {
    render(<Heading level={2}>Section</Heading>);

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders as h3", () => {
    render(<Heading level={3}>Subsection</Heading>);

    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("renders as h4", () => {
    render(<Heading level={4}>Small heading</Heading>);

    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
  });

  it("renders as h5", () => {
    render(<Heading level={5}>Smaller heading</Heading>);

    expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();
  });

  it("renders as h6", () => {
    render(<Heading level={6}>Smallest heading</Heading>);

    expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument();
  });

  it("renders with primary color", () => {
    render(<Heading color="primary">Primary</Heading>);
    const heading = screen.getByRole("heading");

    expect(heading).toHaveClass("text-blue-600");
  });

  it("renders with success color", () => {
    render(<Heading color="success">Success</Heading>);
    const heading = screen.getByRole("heading");

    expect(heading).toHaveClass("text-green-600");
  });

  it("renders with danger color", () => {
    render(<Heading color="danger">Danger</Heading>);
    const heading = screen.getByRole("heading");

    expect(heading).toHaveClass("text-red-600");
  });

  it("renders with warning color", () => {
    render(<Heading color="warning">Warning</Heading>);
    const heading = screen.getByRole("heading");

    expect(heading).toHaveClass("text-yellow-600");
  });
});
