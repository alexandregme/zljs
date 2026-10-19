import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("<Button /> - Default Props", () => {
  it("renders <Button /> correctly", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("renders <Button /> with type button by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "button");
  });

  it("renders <Button /> with variant default by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("px-4", "py-2", "rounded-md");
  });

  it("renders <Button /> with color primary by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-blue-600");
  });

  it("renders <Button /> without icon by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button.querySelector("svg")).not.toBeInTheDocument();
  });

  it("renders <Button /> with iconPosition left by default", () => {
    render(<Button icon="Plus">Add Item</Button>);
    const button = screen.getByRole("button");

    expect(button.firstChild).toBe(screen.getByTestId("Plus"));
  });

  it("renders <Button /> enabled by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeEnabled();
  });

  it("renders <Button /> without aria-label by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).not.toHaveAttribute("aria-label");
  });

  it("renders <Button /> without onClick by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(() => fireEvent.click(button)).not.toThrow();
  });
});

describe("<Button /> - Custom Props", () => {
  it("renders <Button /> with type submit", () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders <Button /> with type reset", () => {
    render(<Button type="reset">Reset</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "reset");
  });

  it("renders <Button /> with variant icon when only icon is passed", () => {
    render(<Button icon="X" aria-label="Close" />);
    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toHaveClass("p-1", "bg-transparent");
    expect(screen.getByTestId("X")).toBeInTheDocument();
  });

  it("renders <Button /> with variant ghost", () => {
    render(<Button variant="ghost" icon="LogOut" aria-label="Logout" />);
    const button = screen.getByRole("button", { name: "Logout" });

    expect(button).toHaveClass("text-neutral-400");
    expect(button).not.toHaveClass("bg-blue-600");
  });

  it("renders <Button /> with variant link", () => {
    render(<Button variant="link">Learn more</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("underline", "text-blue-600");
  });

  it("renders <Button /> with color warning", () => {
    render(<Button color="warning">Warning</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-yellow-500");
  });

  it("renders <Button /> with icon", () => {
    render(<Button icon="Plus">Add Item</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Add Item");
    expect(screen.getByTestId("Plus")).toBeInTheDocument();
  });

  it("renders <Button /> with iconPosition right", () => {
    render(
      <Button icon="ChevronRight" iconPosition="right">
        Next
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button.lastChild).toBe(screen.getByTestId("ChevronRight"));
  });

  it("renders <Button /> with disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("renders <Button /> with aria-label", () => {
    render(<Button icon="X" aria-label="Close" />);
    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toHaveAttribute("aria-label", "Close");
  });

  it("calls onClick when <Button /> is clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when <Button /> is disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
