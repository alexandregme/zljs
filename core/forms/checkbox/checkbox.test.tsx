import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox, Tag } from "@zljs/core";

const LABEL = "Accept terms";
const ERROR = "You must accept the terms";

describe("<Checkbox /> - Default Props", () => {
  it("renders <Checkbox /> correctly", () => {
    render(<Checkbox label={LABEL} />);
    const checkbox = screen.getByRole("checkbox", { name: LABEL });

    expect(checkbox).toBeInTheDocument();
  });

  it("renders <Checkbox /> without aria-label by default", () => {
    render(<Checkbox label={LABEL} />);
    const checkbox = screen.getByRole("checkbox", { name: LABEL });

    expect(checkbox).not.toHaveAttribute("aria-label");
  });

  it("renders <Checkbox /> with variant default by default", () => {
    render(<Checkbox label={LABEL} />);
    const label = screen.getByRole("checkbox").closest("label");

    expect(label).toHaveClass("w-fit");
    expect(label).not.toHaveClass("border");
  });

  it("renders <Checkbox /> with size md by default", () => {
    render(<Checkbox label={LABEL} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveClass("w-4", "h-4");
  });

  it("renders <Checkbox /> unchecked by default", () => {
    render(<Checkbox label={LABEL} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
  });

  it("renders <Checkbox /> enabled by default", () => {
    render(<Checkbox label={LABEL} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeEnabled();
  });

  it("renders <Checkbox /> without error by default", () => {
    render(<Checkbox label={LABEL} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toHaveAttribute("aria-invalid");
    expect(checkbox).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders <Checkbox /> without onChange by default", () => {
    render(<Checkbox label={LABEL} />);
    const checkbox = screen.getByRole("checkbox");

    expect(() => fireEvent.click(checkbox)).not.toThrow();
  });
});

describe("<Checkbox /> - Custom Props", () => {
  it("renders <Checkbox /> with a label made of components", () => {
    render(<Checkbox label={<Tag>Most popular</Tag>} />);
    const checkbox = screen.getByRole("checkbox", { name: "Most popular" });

    expect(checkbox).toBeInTheDocument();
  });

  it("renders <Checkbox /> with aria-label containing the visible text", () => {
    render(
      <Checkbox
        label="Notifications"
        aria-label="Notifications for new comments"
      />,
    );
    const checkbox = screen.getByRole("checkbox", {
      name: "Notifications for new comments",
    });

    expect(checkbox).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("renders <Checkbox /> with size lg", () => {
    render(<Checkbox label={LABEL} size="lg" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveClass("w-5", "h-5");
  });

  it("renders <Checkbox /> checked", () => {
    render(<Checkbox label={LABEL} checked onChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeChecked();
  });

  it("renders <Checkbox /> disabled", () => {
    render(<Checkbox label={LABEL} disabled />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeDisabled();
  });

  it("renders <Checkbox /> invalid and described by its error", () => {
    render(<Checkbox label={LABEL} error={ERROR} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAccessibleDescription(ERROR);
  });

  it("renders <Checkbox /> with its error message", () => {
    render(<Checkbox label={LABEL} error={ERROR} />);
    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent(ERROR);
  });

  it("calls onChange when <Checkbox /> is clicked", () => {
    const handleChange = vi.fn();
    render(<Checkbox label={LABEL} onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls onChange when the label of <Checkbox /> is clicked", () => {
    const handleChange = vi.fn();
    render(<Checkbox label={LABEL} onChange={handleChange} />);
    const label = screen.getByText(LABEL);

    fireEvent.click(label);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls onChange when the content of a <Checkbox /> card is clicked", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        variant="card"
        label={<Tag>Most popular</Tag>}
        onChange={handleChange}
      />,
    );
    const content = screen.getByTestId("tag");

    fireEvent.click(content);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("does not call onChange when the content of a disabled <Checkbox /> card is clicked", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        variant="card"
        label={<Tag>Most popular</Tag>}
        disabled
        onChange={handleChange}
      />,
    );
    const content = screen.getByTestId("tag");

    fireEvent.click(content);

    expect(handleChange).not.toHaveBeenCalled();
  });
});

describe("<Checkbox /> - Styles", () => {
  it("renders <Checkbox /> with variant card", () => {
    render(<Checkbox variant="card" label={LABEL} />);
    const label = screen.getByRole("checkbox").closest("label");

    expect(label).toHaveClass("border", "rounded-lg", "items-center");
    expect(label).not.toHaveClass("w-fit");
  });
});
