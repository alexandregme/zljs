import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Select } from "./select";

const options = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2" },
  { value: "opt3", label: "Option 3" },
];

describe("<Select /> - Default Props", () => {
  it("renders Select correctly", () => {
    render(<Select label="Choose option" options={options} />);
    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
  });

  it("renders Select with label", () => {
    render(<Select label="Choose option" options={options} />);

    expect(screen.getByText("Choose option")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(<Select label="Choose option" options={options} />);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });
});

describe("<Select /> - Custom Props", () => {
  it("renders Select with placeholder", () => {
    render(
      <Select
        label="Choose option"
        options={options}
        placeholder="Select an option"
      />,
    );

    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("renders Select with selected value", () => {
    render(
      <Select
        label="Choose option"
        options={options}
        value="opt2"
        onChange={() => {}}
      />,
    );
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(select.value).toBe("opt2");
  });

  it("renders Select as disabled", () => {
    render(<Select label="Choose option" options={options} disabled />);
    const select = screen.getByRole("combobox");

    expect(select).toBeDisabled();
  });

  it("calls onChange when selection changes", () => {
    const handleChange = jest.fn();
    render(
      <Select
        label="Choose option"
        options={options}
        onChange={handleChange}
      />,
    );
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "opt2" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders Select with error message", () => {
    render(
      <Select
        label="Choose option"
        options={options}
        error="Please select an option"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please select an option",
    );
  });
});
