import { render, screen, fireEvent } from "@testing-library/react";
import { Tag } from "@zljs/core";

describe("<Tag /> - Default Props", () => {
  it("renders <Tag /> correctly", () => {
    render(<Tag>Status</Tag>);
    const tag = screen.getByTestId("tag");

    expect(tag).toBeInTheDocument();
    expect(tag).toHaveTextContent("Status");
  });

  it("renders <Tag /> with removeLabel Remover by default", () => {
    render(<Tag onRemove={vi.fn()}>Removable</Tag>);
    const removeButton = screen.getByRole("button");

    expect(removeButton).toHaveAccessibleName("Remover");
  });

  it("renders <Tag /> without its optional props by default", () => {
    render(<Tag>Status</Tag>);
    const removeButton = screen.queryByRole("button");

    expect(removeButton).not.toBeInTheDocument();
  });
});

describe("<Tag /> - Custom Props", () => {
  it("renders <Tag /> with all its props", () => {
    render(
      <Tag
        color="pink"
        size="lg"
        onRemove={vi.fn()}
        removeLabel="Remover filtro Nome"
      >
        Nome
      </Tag>,
    );
    const tag = screen.getByTestId("tag");
    const removeButton = screen.getByRole("button", {
      name: "Remover filtro Nome",
    });

    expect(tag).toHaveTextContent("Nome");
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

describe("<Tag /> - Styles", () => {
  it("renders <Tag /> with color primary by default", () => {
    render(<Tag>Status</Tag>);
    const tag = screen.getByTestId("tag");

    expect(tag).toHaveClass("bg-zl-primary/15", "text-zl-primary-strong");
  });

  it("renders <Tag /> with color pink", () => {
    render(<Tag color="pink">Status</Tag>);
    const tag = screen.getByTestId("tag");

    expect(tag).toHaveClass("bg-zl-pink/15", "text-zl-pink-strong");
  });

  it("renders <Tag /> with size sm by default", () => {
    render(<Tag>Status</Tag>);
    const tag = screen.getByTestId("tag");

    expect(tag).toHaveClass("text-xs");
  });

  it("renders <Tag /> with size lg", () => {
    render(<Tag size="lg">Status</Tag>);
    const tag = screen.getByTestId("tag");

    expect(tag).toHaveClass("text-base");
    expect(tag).not.toHaveClass("text-xs");
  });

  it("renders <Tag /> remove button in the color of the tag", () => {
    render(<Tag onRemove={vi.fn()}>Removable</Tag>);
    const removeButton = screen.getByRole("button", { name: "Remover" });

    expect(removeButton).toHaveClass(
      "text-current",
      "focus-visible:outline-2",
      "focus-visible:outline-current",
    );
    expect(removeButton).not.toHaveClass("focus:outline-none");
  });
});
