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
});
