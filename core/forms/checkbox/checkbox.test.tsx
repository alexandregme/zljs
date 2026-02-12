import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Checkbox } from "./checkbox";

describe("<Checkbox /> - Default Props", () => {
  it("renders Checkbox correctly", () => {
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
  });

  it("renders Checkbox with label", () => {
    render(<Checkbox label="Accept terms" />);

    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("renders Checkbox unchecked by default", () => {
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
  });
});

describe("<Checkbox /> - Custom Props", () => {
  it("renders Checkbox as checked", () => {
    render(<Checkbox label="Accept terms" checked onChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeChecked();
  });

  it("renders Checkbox as disabled", () => {
    render(<Checkbox label="Accept terms" disabled />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeDisabled();
  });

  it("calls onChange when clicked", () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Accept terms" onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders Checkbox with error message", () => {
    render(<Checkbox label="Accept terms" error="You must accept the terms" />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "You must accept the terms",
    );
  });
});
