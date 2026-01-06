import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Radio } from "./radio";

describe("<Radio /> - Default Props", () => {
  it("renders Radio correctly", () => {
    render(<Radio label="Option 1" name="options" value="option1" />);
    const radio = screen.getByRole("radio");

    expect(radio).toBeInTheDocument();
  });

  it("renders Radio with label", () => {
    render(<Radio label="Option 1" name="options" value="option1" />);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("renders Radio unchecked by default", () => {
    render(<Radio label="Option 1" name="options" value="option1" />);
    const radio = screen.getByRole("radio");

    expect(radio).not.toBeChecked();
  });
});

describe("<Radio /> - Custom Props", () => {
  it("renders Radio as checked", () => {
    render(
      <Radio
        label="Option 1"
        name="options"
        value="option1"
        checked
        onChange={() => {}}
      />,
    );
    const radio = screen.getByRole("radio");

    expect(radio).toBeChecked();
  });

  it("renders Radio as disabled", () => {
    render(<Radio label="Option 1" name="options" value="option1" disabled />);
    const radio = screen.getByRole("radio");

    expect(radio).toBeDisabled();
  });

  it("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    render(
      <Radio
        label="Option 1"
        name="options"
        value="option1"
        onChange={handleChange}
      />,
    );
    const radio = screen.getByRole("radio");

    fireEvent.click(radio);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders multiple radios with same name", () => {
    render(
      <>
        <Radio label="Option 1" name="options" value="option1" />
        <Radio label="Option 2" name="options" value="option2" />
      </>,
    );
    const radios = screen.getAllByRole("radio");

    expect(radios).toHaveLength(2);
  });
});
