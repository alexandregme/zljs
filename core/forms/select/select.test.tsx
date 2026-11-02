import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "@zljs/core";

const LABEL = "Choose option";
const PLACEHOLDER = "Select an option";
const ERROR = "Please select an option";
const OPTIONS = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2" },
  { value: "opt3", label: "Option 3" },
];

describe("<Select /> - Default Props", () => {
  it("renders <Select /> correctly", () => {
    render(<Select label={LABEL} options={OPTIONS} />);
    const select = screen.getByRole("combobox", { name: LABEL });

    expect(select).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Option 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Option 2" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Option 3" }),
    ).toBeInTheDocument();
    expect(select).toHaveValue("opt1");
    expect(select).toBeEnabled();
  });

  it("renders <Select /> without its optional props by default", () => {
    render(<Select label={LABEL} options={OPTIONS} />);
    const select = screen.getByRole("combobox");

    expect(screen.getAllByRole("option")).toHaveLength(OPTIONS.length);
    expect(select).not.toHaveAttribute("aria-label");
    expect(select).not.toHaveAttribute("name");
    expect(select).not.toHaveAttribute("autocomplete");
    expect(select).not.toHaveAttribute("aria-invalid");
    expect(select).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(select).not.toBeRequired();
    expect(() =>
      fireEvent.change(select, { target: { value: "opt2" } }),
    ).not.toThrow();
    expect(() => fireEvent.blur(select)).not.toThrow();
    expect(() => fireEvent.keyDown(select, { key: "Enter" })).not.toThrow();
  });
});

describe("<Select /> - Custom Props", () => {
  it("renders <Select /> with all its props", () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select
        label={LABEL}
        aria-label="Choose option from the list"
        name="option"
        options={OPTIONS}
        placeholder={PLACEHOLDER}
        autoComplete="country"
        value="opt2"
        error={ERROR}
        required
        onChange={() => {}}
        ref={ref}
      />,
    );
    const select = screen.getByRole("combobox", {
      name: "Choose option from the list",
    });

    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(select).toHaveAttribute("name", "option");
    expect(screen.getByRole("option", { name: PLACEHOLDER })).toBeDisabled();
    expect(select).toHaveAttribute("autocomplete", "country");
    expect(select).toHaveValue("opt2");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAccessibleDescription(ERROR);
    expect(screen.getByRole("alert")).toHaveTextContent(ERROR);
    expect(select).toBeRequired();
    expect(ref.current).toBe(select);
  });

  it("renders <Select /> showing its placeholder when there is no value", () => {
    render(
      <Select label={LABEL} options={OPTIONS} placeholder={PLACEHOLDER} />,
    );
    const select = screen.getByRole("combobox");

    expect(select).toHaveValue("");
    expect(select).toHaveDisplayValue(PLACEHOLDER);
  });

  it("renders <Select /> with the chosen option after its placeholder", () => {
    render(
      <Select label={LABEL} options={OPTIONS} placeholder={PLACEHOLDER} />,
    );
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "opt2" } });

    expect(select).toHaveValue("opt2");
  });

  it("renders <Select /> disabled", () => {
    render(<Select label={LABEL} options={OPTIONS} disabled />);
    const select = screen.getByRole("combobox");

    expect(select).toBeDisabled();
  });

  it("renders <Select /> without a visible label when only aria-label is passed", () => {
    render(<Select aria-label="Filter" options={OPTIONS} />);
    const select = screen.getByRole("combobox", { name: "Filter" });

    expect(select).toBeInTheDocument();
    expect(screen.queryByText("Filter")).not.toBeInTheDocument();
  });

  it("calls onChange, onBlur and onKeyDown when <Select /> is used", () => {
    const handleChange = vi.fn();
    const handleBlur = vi.fn();
    const handleKeyDown = vi.fn();
    render(
      <Select
        label={LABEL}
        options={OPTIONS}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />,
    );
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "opt2" } });
    fireEvent.blur(select);
    fireEvent.keyDown(select, { key: "Enter" });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});

describe("<Select /> - Styles", () => {
  it("renders <Select /> with a real focus outline", () => {
    render(<Select label={LABEL} options={OPTIONS} />);
    const select = screen.getByRole("combobox");

    expect(select).toHaveClass(
      "focus-visible:outline-2",
      "focus-visible:outline-zl-primary",
    );
    expect(select).not.toHaveClass("focus:outline-none");
  });
});
