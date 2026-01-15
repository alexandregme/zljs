import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./button";

describe("<Button /> - Default Props", () => {
  it("renders Button correctly", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("renders Button with type button by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "button");
  });

  it("renders Button with default variant by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-blue-600");
  });
});

describe("<Button /> - Custom Props", () => {
  it("renders Button with type submit", () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders Button with type reset", () => {
    render(<Button type="reset">Reset</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "reset");
  });

  it("renders Button with icon only", () => {
    render(<Button icon="BiX" aria-label="Close" />);
    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toHaveClass("bg-transparent");
    expect(screen.getByTestId("BiX")).toBeInTheDocument();
  });

  it("renders Button with icon on left", () => {
    render(<Button icon="BiPlus">Add Item</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Add Item");
    expect(screen.getByTestId("BiPlus")).toBeInTheDocument();
  });

  it("renders Button with icon on right", () => {
    render(
      <Button icon="BiChevronRight" iconPosition="right">
        Next
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Next");
    expect(screen.getByTestId("BiChevronRight")).toBeInTheDocument();
  });

  it("renders Button with aria-label", () => {
    render(<Button icon="BiX" aria-label="Close" />);
    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders Button with success color", () => {
    render(<Button color="success">Success</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-green-600");
  });

  it("renders Button with danger color", () => {
    render(<Button color="danger">Danger</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-red-600");
  });

  it("renders Button with warning color", () => {
    render(<Button color="warning">Warning</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-yellow-500");
  });

  it("renders Button as disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
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
