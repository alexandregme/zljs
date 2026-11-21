import { render, screen, fireEvent } from "@testing-library/react";
import { Disclosure } from "@zljs/core";

const SUMMARY = "Monday, 23/11";
const CONTENT = "Three orders";

describe("<Disclosure /> - Default Props", () => {
  it("renders <Disclosure /> correctly", () => {
    render(<Disclosure summary={SUMMARY}>{CONTENT}</Disclosure>);
    const disclosure = screen.getByRole("group");
    const summary = screen.getByTestId("disclosure-summary");
    const content = screen.getByTestId("disclosure-content");

    expect(disclosure).toBeInTheDocument();
    expect(content).toHaveTextContent(CONTENT);
    expect(summary).toHaveTextContent(SUMMARY);
    expect(disclosure).not.toHaveAttribute("open");
  });
});

describe("<Disclosure /> - Custom Props", () => {
  it("renders <Disclosure /> with all its props", () => {
    render(
      <Disclosure summary={SUMMARY} defaultOpen variant="outlined">
        {CONTENT}
      </Disclosure>,
    );
    const disclosure = screen.getByRole("group");

    expect(disclosure).toHaveAttribute("open");
  });

  it("opens and closes <Disclosure /> when its summary is clicked", () => {
    render(<Disclosure summary={SUMMARY}>{CONTENT}</Disclosure>);
    const disclosure = screen.getByRole("group");
    const summary = screen.getByTestId("disclosure-summary");

    fireEvent.click(summary);

    expect(disclosure).toHaveAttribute("open");

    fireEvent.click(summary);

    expect(disclosure).not.toHaveAttribute("open");
  });
});

describe("<Disclosure /> - Styles", () => {
  it("renders <Disclosure /> with variant plain by default", () => {
    render(<Disclosure summary={SUMMARY}>{CONTENT}</Disclosure>);
    const disclosure = screen.getByRole("group");
    const summary = screen.getByTestId("disclosure-summary");

    expect(summary).toHaveClass("focus-visible:outline-2");
    expect(disclosure).not.toHaveClass("border");
    expect(summary).not.toHaveClass("focus:outline-none");
  });

  it("renders <Disclosure /> with variant outlined", () => {
    render(
      <Disclosure summary={SUMMARY} variant="outlined">
        {CONTENT}
      </Disclosure>,
    );
    const disclosure = screen.getByRole("group");

    expect(disclosure).toHaveClass("border");
  });
});
