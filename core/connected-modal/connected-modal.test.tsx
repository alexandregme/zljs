import { render, screen, fireEvent } from "@testing-library/react";
import { ConnectedModal } from "./connected-modal";
import { useModalStore } from "../state/modal";

const reset = () => useModalStore.setState({ modals: [] });

describe("<ConnectedModal />", () => {
  beforeEach(() => reset());

  it("does not render when modal is not open", () => {
    render(<ConnectedModal modalId="test" title="Test Modal" />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when modal is open in store", () => {
    useModalStore.getState().openModal("test");

    render(<ConnectedModal modalId="test" title="Test Modal" />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("closes modal via store on close button click", () => {
    useModalStore.getState().openModal("test");

    render(<ConnectedModal modalId="test" title="Test Modal" />);

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(useModalStore.getState().isOpen("test")).toBe(false);
  });

  it("renders children", () => {
    useModalStore.getState().openModal("test");

    render(
      <ConnectedModal modalId="test" title="Test Modal">
        <p>Modal content</p>
      </ConnectedModal>,
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("renders description", () => {
    useModalStore.getState().openModal("test");

    render(
      <ConnectedModal
        modalId="test"
        title="Test Modal"
        description="Some description"
      />,
    );

    expect(screen.getByText("Some description")).toBeInTheDocument();
  });
});
