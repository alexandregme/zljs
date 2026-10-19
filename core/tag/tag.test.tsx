import { render, screen, fireEvent } from "@testing-library/react";
import { Tag } from "./tag";

describe("<Tag /> - Default Props", () => {
  it("renders <Tag /> correctly", () => {
    render(<Tag>Status</Tag>);
    const tag = screen.getByTestId("tag");

    expect(tag).toBeInTheDocument();
    expect(tag).toHaveTextContent("Status");
  });

  it("renders <Tag /> with color blue by default", () => {
    render(<Tag>Status</Tag>);
    const tag = screen.getByTestId("tag");

    expect(tag).toHaveClass("bg-blue-100");
  });

  it("renders <Tag /> without onRemove by default", () => {
    render(<Tag>Status</Tag>);
    const removeButton = screen.queryByRole("button");

    expect(removeButton).not.toBeInTheDocument();
  });
});

describe("<Tag /> - Custom Props", () => {
  it("renders <Tag /> with color green", () => {
    render(<Tag color="green">Active</Tag>);
    const tag = screen.getByTestId("tag");

    expect(tag).toHaveClass("bg-green-100");
  });

  it("renders <Tag /> with onRemove", () => {
    render(<Tag onRemove={vi.fn()}>Removable</Tag>);
    const removeButton = screen.getByRole("button", { name: "Remover" });

    expect(removeButton).toBeInTheDocument();
  });

  it("calls onRemove when <Tag /> remove button is clicked", () => {
    const handleRemove = vi.fn();
    render(<Tag onRemove={handleRemove}>Removable</Tag>);
    const removeButton = screen.getByRole("button", { name: "Remover" });

    fireEvent.click(removeButton);

    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});
