import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "@zljs/core";

const LABEL = "Username";
const ERROR = "Email is required";

describe("<Input /> - Default Props", () => {
  it("renders <Input /> correctly", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox", { name: LABEL });

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toBeEnabled();
  });

  it("renders <Input /> without its optional props by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("");
    expect(input).not.toHaveAttribute("aria-label");
    expect(input).not.toHaveAttribute("name");
    expect(input).not.toHaveAttribute("placeholder");
    expect(input).not.toHaveAttribute("autocomplete");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(input).not.toBeRequired();
    expect(() =>
      fireEvent.change(input, { target: { value: "john" } }),
    ).not.toThrow();
    expect(() => fireEvent.blur(input)).not.toThrow();
    expect(() => fireEvent.keyDown(input, { key: "Enter" })).not.toThrow();
  });
});

describe("<Input /> - Custom Props", () => {
  it("renders <Input /> with all its props", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Input
        label="Email"
        aria-label="Email address"
        name="email"
        type="email"
        placeholder="name@example.com"
        autoComplete="email"
        value="john@example.com"
        error={ERROR}
        required
        onChange={() => {}}
        ref={ref}
      />,
    );
    const input = screen.getByRole("textbox", { name: "Email address" });

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "name@example.com");
    expect(input).toHaveAttribute("autocomplete", "email");
    expect(input).toHaveValue("john@example.com");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(ERROR);
    expect(screen.getByRole("alert")).toHaveTextContent(ERROR);
    expect(input).toBeRequired();
    expect(ref.current).toBe(input);
  });

  it("renders <Input /> with type password", () => {
    render(<Input label="Password" type="password" />);
    const input = screen.getByLabelText("Password");

    expect(input).toHaveAttribute("type", "password");
  });

  it("renders <Input /> disabled", () => {
    render(<Input label={LABEL} disabled />);
    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
  });

  it("renders <Input /> without a visible label when only aria-label is passed", () => {
    render(<Input aria-label="Search" />);
    const input = screen.getByRole("textbox", { name: "Search" });

    expect(input).toBeInTheDocument();
    expect(screen.queryByText("Search")).not.toBeInTheDocument();
  });

  it("calls onChange, onBlur and onKeyDown when <Input /> is used", () => {
    const handleChange = vi.fn();
    const handleBlur = vi.fn();
    const handleKeyDown = vi.fn();
    render(
      <Input
        label={LABEL}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />,
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "john" } });
    fireEvent.blur(input);
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});

describe("<Input /> - Styles", () => {
  it("renders <Input /> with a real focus outline", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "focus-visible:outline-2",
      "focus-visible:outline-zl-primary",
    );
    expect(input).not.toHaveClass("focus:outline-none");
  });
});
