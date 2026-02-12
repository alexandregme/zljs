import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tag } from "./tag";

describe("<Tag /> - Default Props", () => {
  it("renders Tag correctly", () => {
    render(<Tag>Status</Tag>);

    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders with default blue color", () => {
    render(<Tag>Status</Tag>);

    expect(screen.getByText("Status")).toHaveClass("bg-blue-100");
  });
});

describe("<Tag /> - Custom Props", () => {
  it("renders with green color", () => {
    render(<Tag color="green">Active</Tag>);

    expect(screen.getByText("Active")).toHaveClass("bg-green-100");
  });

  it("renders with red color", () => {
    render(<Tag color="red">Error</Tag>);

    expect(screen.getByText("Error")).toHaveClass("bg-red-100");
  });

  it("renders with yellow color", () => {
    render(<Tag color="yellow">Warning</Tag>);

    expect(screen.getByText("Warning")).toHaveClass("bg-yellow-100");
  });

  it("renders with gray color", () => {
    render(<Tag color="gray">Inactive</Tag>);

    expect(screen.getByText("Inactive")).toHaveClass("bg-slate-100");
  });

  it("renders remove button when onRemove is provided", () => {
    render(<Tag onRemove={() => {}}>Removable</Tag>);

    expect(screen.getByRole("button", { name: "Remover" })).toBeInTheDocument();
  });

  it("does not render remove button when onRemove is not provided", () => {
    render(<Tag>Static</Tag>);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const handleRemove = vi.fn();
    render(<Tag onRemove={handleRemove}>Removable</Tag>);

    fireEvent.click(screen.getByRole("button", { name: "Remover" }));

    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});
