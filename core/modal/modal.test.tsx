import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Modal } from "./modal";

describe("<Modal /> - Default Props", () => {
  it("renders Modal when open", () => {
    render(<Modal open={true} onClose={() => {}} title="Test Modal" />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render Modal when closed", () => {
    render(<Modal open={false} onClose={() => {}} title="Test Modal" />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders Modal with title", () => {
    render(<Modal open={true} onClose={() => {}} title="Test Modal" />);

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });
});

describe("<Modal /> - Custom Props", () => {
  it("renders Modal with description", () => {
    render(
      <Modal
        open={true}
        onClose={() => {}}
        title="Test Modal"
        description="This is a description"
      />,
    );

    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  it("renders Modal with children", () => {
    render(
      <Modal open={true} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("calls onClose when escape key is pressed", () => {
    const handleClose = vi.fn();
    render(<Modal open={true} onClose={handleClose} title="Test Modal" />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("renders close button", () => {
    render(<Modal open={true} onClose={() => {}} title="Test Modal" />);

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn();
    render(<Modal open={true} onClose={handleClose} title="Test Modal" />);

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

describe("<Modal /> - Styles", () => {
  it("renders <Modal /> with size xs", () => {
    render(<Modal open onClose={() => {}} title="Test Modal" size="xs" />);
    const dialog = screen.getByRole("dialog", { name: "Test Modal" });

    expect(dialog).toHaveClass("max-w-xs");
  });

  it("renders <Modal /> with color danger", () => {
    render(<Modal open onClose={() => {}} title="Test Modal" color="danger" />);
    const dialog = screen.getByRole("dialog", { name: "Test Modal" });
    const title = screen.getByRole("heading", { name: "Test Modal" });

    expect(dialog).toHaveClass(
      "bg-[color-mix(in_srgb,var(--color-zl-danger)_15%,white)]",
    );
    expect(dialog).not.toHaveClass("bg-white");
    expect(title).toHaveClass("text-zl-danger-strong");
  });

  it("renders <Modal /> without a color by default", () => {
    render(<Modal open onClose={() => {}} title="Test Modal" />);
    const dialog = screen.getByRole("dialog", { name: "Test Modal" });
    const title = screen.getByRole("heading", { name: "Test Modal" });

    expect(dialog).toHaveClass("bg-white");
    expect(title).toHaveClass("text-gray-900");
  });
});
