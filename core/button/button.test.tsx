import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@zljs/core";

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

  it("renders <Button /> with a focus outline with variant default by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass(
      "focus-visible:outline-2",
      "focus-visible:outline-offset-2",
    );
    expect(button).not.toHaveClass("focus:outline-none");
  });

  it("renders <Button /> with color primary by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-zl-primary-bg");
  });

  it("renders <Button /> with size md by default", () => {
    render(<Button icon="Plus">Add Item</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("px-4", "py-2", "text-sm");
    expect(button.querySelector("svg")).toHaveAttribute("width", "16");
  });

  it("renders <Button /> without fullWidth by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).not.toHaveClass("w-full");
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
    expect(button).not.toHaveAttribute("aria-expanded");
  });

  it("renders <Button /> with aria-expanded", () => {
    const { rerender } = render(<Button aria-expanded>Menu</Button>);
    const button = screen.getByRole("button", { name: "Menu" });

    expect(button).toHaveAttribute("aria-expanded", "true");

    rerender(<Button aria-expanded={false}>Menu</Button>);

    expect(button).toHaveAttribute("aria-expanded", "false");
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
    expect(button).not.toHaveClass("bg-zl-primary-bg");
    expect(screen.getByTestId("X")).toBeInTheDocument();
  });

  it("renders <Button /> with an explicit variant when only icon is passed", () => {
    render(<Button variant="default" icon="X" aria-label="Close" />);
    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toHaveClass("px-4", "py-2", "bg-zl-primary-bg");
    expect(button).not.toHaveClass("p-1");
    expect(screen.getByTestId("X")).toBeInTheDocument();
  });

  it("renders <Button /> with a focus outline with variant icon", () => {
    render(<Button icon="X" aria-label="Close" />);
    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toHaveClass(
      "focus-visible:outline-2",
      "focus-visible:outline-offset-2",
    );
    expect(button).not.toHaveClass("focus:outline-none");
  });

  it("renders <Button /> with variant link", () => {
    render(<Button variant="link">Learn more</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("hover:underline", "text-zl-primary");
    expect(button).not.toHaveClass("underline");
    expect(button).not.toHaveClass("bg-zl-primary-bg");
    expect(button).not.toHaveClass("hover:bg-zl-primary-hover");
  });

  it("renders <Button /> with a focus outline with variant link", () => {
    render(<Button variant="link">Learn more</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass(
      "focus-visible:outline-2",
      "focus-visible:outline-offset-2",
    );
    expect(button).not.toHaveClass("focus:outline-none");
  });

  it("renders <Button /> with a 44px touch target with variant link", () => {
    render(<Button variant="link">Learn more</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("relative", "after:h-11", "after:min-w-11");
  });

  it("renders <Button /> with variant link and color danger", () => {
    render(
      <Button variant="link" color="danger">
        Remove
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("text-zl-danger");
    expect(button).not.toHaveClass("bg-zl-danger-bg");
  });

  it("renders <Button /> with variant link and color success", () => {
    render(
      <Button variant="link" color="success">
        Confirm
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("text-zl-success");
    expect(button).not.toHaveClass("bg-zl-success-bg");
  });

  it("renders <Button /> with variant link and color warning", () => {
    render(
      <Button variant="link" color="warning">
        Review
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("text-zl-warning");
    expect(button).not.toHaveClass("bg-zl-warning-bg");
    expect(button).not.toHaveClass("text-zl-warning-on");
  });

  it("renders <Button /> with variant link and color info", () => {
    render(
      <Button variant="link" color="info">
        Details
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("text-zl-info");
    expect(button).not.toHaveClass("bg-zl-info-bg");
  });

  it("renders <Button /> with variant link and color muted", () => {
    render(
      <Button variant="link" color="muted">
        Skip
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("text-zl-muted");
    expect(button).not.toHaveClass("bg-zl-muted-bg");
  });

  it("renders <Button /> with variant link and color ghost", () => {
    render(
      <Button variant="link" color="ghost">
        Menu
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("text-current", "hover:bg-transparent");
  });

  it("renders <Button /> with variant link and color none", () => {
    render(
      <Button variant="link" color="none">
        Cancel
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("text-slate-600");
  });

  it("renders <Button /> with color warning", () => {
    render(<Button color="warning">Warning</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-zl-warning-bg");
  });

  it("renders <Button /> with color none", () => {
    render(<Button color="none">Cancel</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-gray-100", "text-gray-900");
    expect(button).not.toHaveClass("text-white");
  });

  it("renders <Button /> with color ghost", () => {
    render(<Button color="ghost">Menu</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-transparent", "text-current");
    expect(button).not.toHaveClass("text-white");
  });

  it("renders <Button /> with color ghost when only icon is passed", () => {
    render(<Button color="ghost" icon="LogOut" aria-label="Logout" />);
    const button = screen.getByRole("button", { name: "Logout" });

    expect(button).toHaveClass("p-1", "text-current", "hover:text-current");
    expect(button).not.toHaveClass("text-gray-500");
    expect(button).not.toHaveClass("hover:text-gray-700");
  });

  it("renders <Button /> with size sm", () => {
    render(
      <Button icon="Plus" size="sm">
        Add Item
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("px-2", "py-1", "text-xs");
    expect(button.querySelector("svg")).toHaveAttribute("width", "12");
  });

  it("renders <Button /> with size sm when only icon is passed", () => {
    render(<Button icon="X" size="sm" aria-label="Close" />);
    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toHaveClass("p-0.5");
    expect(button).not.toHaveClass("p-1");
  });

  it("renders <Button /> with size lg", () => {
    render(
      <Button icon="Plus" size="lg">
        Add Item
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("px-6", "py-3", "text-base");
    expect(button.querySelector("svg")).toHaveAttribute("width", "24");
  });

  it("renders <Button /> with size lg when only icon is passed", () => {
    render(<Button icon="X" size="lg" aria-label="Close" />);
    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toHaveClass("p-2");
    expect(button).not.toHaveClass("p-1");
  });

  it("renders <Button /> with fullWidth", () => {
    render(<Button fullWidth>Continue</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("w-full");
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
