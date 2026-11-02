import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextArea } from "@zljs/core";

const LABEL = "Description";
const ERROR = "Description is required";

describe("<TextArea /> - Default Props", () => {
  it("renders <TextArea /> correctly", () => {
    render(<TextArea label={LABEL} />);
    const textarea = screen.getByRole("textbox", { name: LABEL });

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("rows", "3");
    expect(textarea).toBeEnabled();
  });

  it("renders <TextArea /> without its optional props by default", () => {
    render(<TextArea label={LABEL} />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveValue("");
    expect(textarea).not.toHaveAttribute("aria-label");
    expect(textarea).not.toHaveAttribute("name");
    expect(textarea).not.toHaveAttribute("placeholder");
    expect(textarea).not.toHaveAttribute("autocomplete");
    expect(textarea).not.toHaveAttribute("aria-invalid");
    expect(textarea).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(textarea).not.toBeRequired();
    expect(() =>
      fireEvent.change(textarea, { target: { value: "New text" } }),
    ).not.toThrow();
    expect(() => fireEvent.blur(textarea)).not.toThrow();
    expect(() => fireEvent.keyDown(textarea, { key: "Enter" })).not.toThrow();
  });
});

describe("<TextArea /> - Custom Props", () => {
  it("renders <TextArea /> with all its props", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(
      <TextArea
        label={LABEL}
        aria-label="Description of the order"
        name="description"
        placeholder="Enter description"
        autoComplete="street-address"
        value="Some text"
        rows={5}
        error={ERROR}
        required
        onChange={() => {}}
        ref={ref}
      />,
    );
    const textarea = screen.getByRole("textbox", {
      name: "Description of the order",
    });

    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(textarea).toHaveAttribute("name", "description");
    expect(textarea).toHaveAttribute("placeholder", "Enter description");
    expect(textarea).toHaveAttribute("autocomplete", "street-address");
    expect(textarea).toHaveValue("Some text");
    expect(textarea).toHaveAttribute("rows", "5");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription(ERROR);
    expect(screen.getByRole("alert")).toHaveTextContent(ERROR);
    expect(textarea).toBeRequired();
    expect(ref.current).toBe(textarea);
  });

  it("renders <TextArea /> disabled", () => {
    render(<TextArea label={LABEL} disabled />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toBeDisabled();
  });

  it("renders <TextArea /> without a visible label when only aria-label is passed", () => {
    render(<TextArea aria-label="Notes" />);
    const textarea = screen.getByRole("textbox", { name: "Notes" });

    expect(textarea).toBeInTheDocument();
    expect(screen.queryByText("Notes")).not.toBeInTheDocument();
  });

  it("calls onChange, onBlur and onKeyDown when <TextArea /> is used", () => {
    const handleChange = vi.fn();
    const handleBlur = vi.fn();
    const handleKeyDown = vi.fn();
    render(
      <TextArea
        label={LABEL}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />,
    );
    const textarea = screen.getByRole("textbox");

    fireEvent.change(textarea, { target: { value: "New text" } });
    fireEvent.blur(textarea);
    fireEvent.keyDown(textarea, { key: "Enter" });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});

describe("<TextArea /> - Styles", () => {
  it("renders <TextArea /> with a real focus outline", () => {
    render(<TextArea label={LABEL} />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveClass(
      "focus-visible:outline-2",
      "focus-visible:outline-zl-primary",
    );
    expect(textarea).not.toHaveClass("focus:outline-none");
  });
});
