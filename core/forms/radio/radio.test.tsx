import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Radio } from "@zljs/core";

const LABEL = "Option 1";
const NAME = "options";
const VALUE = "option1";

describe("<Radio /> - Default Props", () => {
  it("renders <Radio /> correctly", () => {
    render(<Radio label={LABEL} name={NAME} value={VALUE} />);
    const radio = screen.getByRole("radio", { name: LABEL });

    expect(radio).toBeInTheDocument();
    expect(radio).toHaveAttribute("name", NAME);
    expect(radio).toHaveAttribute("value", VALUE);
    expect(radio).toBeEnabled();
  });

  it("renders <Radio /> without its optional props by default", () => {
    render(<Radio label={LABEL} name={NAME} value={VALUE} />);
    const radio = screen.getByRole("radio");

    expect(radio).not.toHaveAttribute("aria-label");
    expect(radio).not.toBeChecked();
    expect(radio).not.toBeRequired();
    expect(() => fireEvent.click(radio)).not.toThrow();
    expect(() => fireEvent.blur(radio)).not.toThrow();
    expect(() => fireEvent.keyDown(radio, { key: "Enter" })).not.toThrow();
  });
});

describe("<Radio /> - Custom Props", () => {
  it("renders <Radio /> with all its props", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Radio
        label={LABEL}
        aria-label="Option 1 of the list"
        name={NAME}
        value={VALUE}
        checked
        required
        onChange={() => {}}
        ref={ref}
      />,
    );
    const radio = screen.getByRole("radio", { name: "Option 1 of the list" });

    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(radio).toBeChecked();
    expect(radio).toBeRequired();
    expect(ref.current).toBe(radio);
  });

  it("renders <Radio /> checked when its label is clicked", () => {
    render(<Radio label={LABEL} name={NAME} value={VALUE} />);
    const radio = screen.getByRole("radio");

    fireEvent.click(screen.getByText(LABEL));

    expect(radio).toBeChecked();
  });

  it("renders only the last clicked <Radio /> checked with the same name", () => {
    render(
      <>
        <Radio label="Option 1" name={NAME} value="option1" />
        <Radio label="Option 2" name={NAME} value="option2" />
      </>,
    );
    const first = screen.getByRole("radio", { name: "Option 1" });
    const second = screen.getByRole("radio", { name: "Option 2" });

    fireEvent.click(first);
    fireEvent.click(second);

    expect(second).toBeChecked();
    expect(first).not.toBeChecked();
  });

  it("renders <Radio /> disabled", () => {
    render(<Radio label={LABEL} name={NAME} value={VALUE} disabled />);
    const radio = screen.getByRole("radio");

    expect(radio).toBeDisabled();
  });

  it("renders <Radio /> without a visible label when only aria-label is passed", () => {
    render(<Radio aria-label="Option" name={NAME} value={VALUE} />);
    const radio = screen.getByRole("radio", { name: "Option" });

    expect(radio).toBeInTheDocument();
    expect(screen.queryByText("Option")).not.toBeInTheDocument();
  });

  it("calls onChange, onBlur and onKeyDown when <Radio /> is used", () => {
    const handleChange = vi.fn();
    const handleBlur = vi.fn();
    const handleKeyDown = vi.fn();
    render(
      <Radio
        label={LABEL}
        name={NAME}
        value={VALUE}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />,
    );
    const radio = screen.getByRole("radio");

    fireEvent.click(radio);
    fireEvent.blur(radio);
    fireEvent.keyDown(radio, { key: "Enter" });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});

describe("<Radio /> - Styles", () => {
  it("renders <Radio /> with the theme color and a real focus outline", () => {
    render(<Radio label={LABEL} name={NAME} value={VALUE} />);
    const radio = screen.getByRole("radio");

    expect(radio).toHaveClass(
      "accent-zl-primary",
      "focus-visible:outline-2",
      "focus-visible:outline-zl-primary",
    );
    expect(radio).not.toHaveClass("focus:ring-2");
  });
});
