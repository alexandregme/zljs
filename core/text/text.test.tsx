import { render, screen } from "@testing-library/react";
import { Text } from "./text";

describe("<Text /> - Default Props", () => {
  it("renders <Text /> correctly", () => {
    render(<Text>Total</Text>);
    const text = screen.getByRole("paragraph");

    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent("Total");
  });

  it("renders <Text /> with as p by default", () => {
    render(<Text>Total</Text>);
    const text = screen.getByRole("paragraph");

    expect(text.tagName).toBe("P");
  });

  it("renders <Text /> with variant body by default", () => {
    render(<Text>Total</Text>);
    const text = screen.getByRole("paragraph");

    expect(text).toHaveClass("text-base");
  });
});

describe("<Text /> - Custom Props", () => {
  it("renders <Text /> with children as number", () => {
    render(<Text>{150}</Text>);
    const text = screen.getByRole("paragraph");

    expect(text).toHaveTextContent("150");
  });

  it("renders <Text /> with as span", () => {
    render(<Text as="span">Total</Text>);
    const text = screen.getByTestId("text");

    expect(text.tagName).toBe("SPAN");
  });

  it("renders <Text /> with variant display", () => {
    render(<Text variant="display">150</Text>);
    const text = screen.getByRole("paragraph");

    expect(text).toHaveClass("text-3xl", "font-bold");
  });
});
