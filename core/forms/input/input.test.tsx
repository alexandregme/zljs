import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "./input";

describe("<Input /> - Default Props", () => {
  it("renders Input correctly", () => {
    render(<Input label="Username" />);
    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
  });

  it("renders Input with label", () => {
    render(<Input label="Username" />);

    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders Input with type text by default", () => {
    render(<Input label="Username" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "text");
  });
});

describe("<Input /> - Custom Props", () => {
  it("renders Input with placeholder", () => {
    render(<Input label="Username" placeholder="Enter username" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("placeholder", "Enter username");
  });

  it("renders Input with value", () => {
    render(<Input label="Username" value="john" onChange={() => {}} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("john");
  });

  it("renders Input with type password", () => {
    render(<Input label="Password" type="password" />);
    const input = screen.getByLabelText("Password");

    expect(input).toHaveAttribute("type", "password");
  });

  it("renders Input with type email", () => {
    render(<Input label="Email" type="email" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "email");
  });

  it("renders Input with error message", () => {
    render(<Input label="Username" error="Username is required" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Username is required");
  });

  it("renders Input as disabled", () => {
    render(<Input label="Username" disabled />);
    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
  });

  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(<Input label="Username" onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "john" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls onKeyDown when key is pressed", () => {
    const handleKeyDown = jest.fn();
    render(<Input label="Username" onKeyDown={handleKeyDown} />);
    const input = screen.getByRole("textbox");

    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it("renders Input with aria-label for accessibility", () => {
    render(<Input aria-label="Search field" placeholder="Search..." />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("aria-label", "Search field");
  });

  it("renders Input without visible label", () => {
    render(<Input aria-label="Hidden label" />);

    expect(screen.queryByRole("label")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-label",
      "Hidden label",
    );
  });
});
