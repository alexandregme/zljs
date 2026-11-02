import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "@zljs/core";

const LABEL = "Username";
const ERROR = "Username is required";

describe("<Input /> - Default Props", () => {
  it("renders <Input /> correctly", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox", { name: LABEL });

    expect(input).toBeInTheDocument();
  });

  it("renders <Input /> with a real focus outline by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "focus-visible:outline-2",
      "focus-visible:outline-zl-primary",
    );
    expect(input).not.toHaveClass("focus:outline-none");
  });

  it("renders <Input /> without aria-label by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).not.toHaveAttribute("aria-label");
  });

  it("renders <Input /> without name by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).not.toHaveAttribute("name");
  });

  it("renders <Input /> with type text by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "text");
  });

  it("renders <Input /> without placeholder by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).not.toHaveAttribute("placeholder");
  });

  it("renders <Input /> without autoComplete by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).not.toHaveAttribute("autocomplete");
  });

  it("renders <Input /> empty by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("");
  });

  it("renders <Input /> without error by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders <Input /> enabled by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).toBeEnabled();
  });

  it("renders <Input /> not required by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(input).not.toBeRequired();
  });

  it("renders <Input /> without onChange by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(() =>
      fireEvent.change(input, { target: { value: "john" } }),
    ).not.toThrow();
  });

  it("renders <Input /> without onBlur by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(() => fireEvent.blur(input)).not.toThrow();
  });

  it("renders <Input /> without onKeyDown by default", () => {
    render(<Input label={LABEL} />);
    const input = screen.getByRole("textbox");

    expect(() => fireEvent.keyDown(input, { key: "Enter" })).not.toThrow();
  });
});

describe("<Input /> - Custom Props", () => {
  it("renders <Input /> without a visible label when only aria-label is passed", () => {
    render(<Input aria-label="Search" />);
    const input = screen.getByRole("textbox", { name: "Search" });

    expect(input).toBeInTheDocument();
    expect(screen.queryByText("Search")).not.toBeInTheDocument();
  });

  it("renders <Input /> with aria-label containing the visible label", () => {
    render(<Input label="Search" aria-label="Search the table" />);
    const input = screen.getByRole("textbox", { name: "Search the table" });

    expect(input).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("renders <Input /> with name", () => {
    render(<Input label={LABEL} name="username" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("name", "username");
  });

  it("renders <Input /> with type password", () => {
    render(<Input label="Password" type="password" />);
    const input = screen.getByLabelText("Password");

    expect(input).toHaveAttribute("type", "password");
  });

  it("renders <Input /> with type email", () => {
    render(<Input label="Email" type="email" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "email");
  });

  it("renders <Input /> with placeholder", () => {
    render(<Input label={LABEL} placeholder="Enter username" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("placeholder", "Enter username");
  });

  it("renders <Input /> with autoComplete", () => {
    render(<Input label="Email" type="email" autoComplete="email" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("autocomplete", "email");
  });

  it("renders <Input /> with value", () => {
    render(<Input label={LABEL} value="john" onChange={() => {}} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("john");
  });

  it("renders <Input /> invalid and described by its error", () => {
    render(<Input label={LABEL} error={ERROR} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(ERROR);
  });

  it("renders <Input /> with its error message", () => {
    render(<Input label={LABEL} error={ERROR} />);
    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent(ERROR);
  });

  it("renders <Input /> disabled", () => {
    render(<Input label={LABEL} disabled />);
    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
  });

  it("renders <Input /> required", () => {
    render(<Input label={LABEL} required />);
    const input = screen.getByRole("textbox");

    expect(input).toBeRequired();
  });

  it("calls onChange when <Input /> value changes", () => {
    const handleChange = vi.fn();
    render(<Input label={LABEL} onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "john" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls onBlur when <Input /> loses focus", () => {
    const handleBlur = vi.fn();
    render(<Input label={LABEL} onBlur={handleBlur} />);
    const input = screen.getByRole("textbox");

    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("calls onKeyDown when a key is pressed in <Input />", () => {
    const handleKeyDown = vi.fn();
    render(<Input label={LABEL} onKeyDown={handleKeyDown} />);
    const input = screen.getByRole("textbox");

    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it("forwards ref to the field of <Input />", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input label={LABEL} ref={ref} />);
    const input = screen.getByRole("textbox");

    expect(ref.current).toBe(input);
  });
});
