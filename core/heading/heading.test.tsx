import { render, screen } from "@testing-library/react";
import { Heading } from "./heading";

describe("<Heading /> - Default Props", () => {
  it("renders <Heading /> correctly", () => {
    render(<Heading>Page Title</Heading>);
    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Page Title");
  });

  it("renders <Heading /> with level 1 by default", () => {
    render(<Heading>Page Title</Heading>);
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveClass("text-3xl", "font-bold");
  });

  it("renders <Heading /> without color by default", () => {
    render(<Heading>Page Title</Heading>);
    const heading = screen.getByRole("heading");

    expect(heading).toHaveAttribute("class", "text-3xl font-bold");
  });
});

describe("<Heading /> - Custom Props", () => {
  it.each([2, 3, 4, 5, 6] as const)(
    "renders <Heading /> with level %i",
    (level) => {
      render(<Heading level={level}>Title</Heading>);
      const heading = screen.getByRole("heading", { level });

      expect(heading).toBeInTheDocument();
    },
  );

  it("renders <Heading /> with color warning", () => {
    render(<Heading color="warning">Warning</Heading>);
    const heading = screen.getByRole("heading");

    expect(heading).toHaveClass("text-yellow-600");
  });
});
