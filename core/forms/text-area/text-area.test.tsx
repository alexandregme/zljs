import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextArea } from "./text-area";

describe("<TextArea /> - Default Props", () => {
  it("renders TextArea correctly", () => {
    render(<TextArea label="Description" />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toBeInTheDocument();
  });

  it("renders TextArea with label", () => {
    render(<TextArea label="Description" />);

    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders TextArea as textarea element", () => {
    render(<TextArea label="Description" />);
    const textarea = screen.getByRole("textbox");

    expect(textarea.tagName).toBe("TEXTAREA");
  });
});

describe("<TextArea /> - Custom Props", () => {
  it("renders TextArea with placeholder", () => {
    render(<TextArea label="Description" placeholder="Enter description" />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveAttribute("placeholder", "Enter description");
  });

  it("renders TextArea with value", () => {
    render(
      <TextArea label="Description" value="Some text" onChange={() => {}} />,
    );
    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveValue("Some text");
  });

  it("renders TextArea with custom rows", () => {
    render(<TextArea label="Description" rows={5} />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("renders TextArea with default rows of 3", () => {
    render(<TextArea label="Description" />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveAttribute("rows", "3");
  });

  it("renders TextArea with error message", () => {
    render(<TextArea label="Description" error="Description is required" />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Description is required",
    );
  });

  it("renders TextArea as disabled", () => {
    render(<TextArea label="Description" disabled />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toBeDisabled();
  });

  it("calls onChange when textarea value changes", () => {
    const handleChange = vi.fn();
    render(<TextArea label="Description" onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");

    fireEvent.change(textarea, { target: { value: "New text" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
