import { act, fireEvent, render, screen } from "@testing-library/react";
import { appInitialState, ConnectedModal, useAppStore } from "@zljs/core";

const MODAL_ID = "test";

afterEach(() => {
  act(() => {
    useAppStore.setState(appInitialState);
  });
});

describe("<ConnectedModal /> - Default Props", () => {
  it("renders <ConnectedModal /> correctly", () => {
    useAppStore.getState().openModal(MODAL_ID);
    render(<ConnectedModal modalId={MODAL_ID} title="Test Modal" />);
    const dialog = screen.getByRole("dialog", { name: "Test Modal" });

    expect(dialog).toBeInTheDocument();
  });

  it("renders <ConnectedModal /> without its optional props by default", () => {
    useAppStore.getState().openModal(MODAL_ID);
    render(<ConnectedModal modalId={MODAL_ID} title="Test Modal" />);
    const dialog = screen.getByRole("dialog", { name: "Test Modal" });

    expect(dialog).not.toHaveAttribute("aria-describedby");
  });

  it("renders nothing when <ConnectedModal /> is not open in the store", () => {
    useAppStore.getState().openModal("other");
    render(<ConnectedModal modalId={MODAL_ID} title="Test Modal" />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("<ConnectedModal /> - Custom Props", () => {
  it("renders <ConnectedModal /> with all its props", () => {
    useAppStore.getState().openModal(MODAL_ID);
    render(
      <ConnectedModal
        modalId={MODAL_ID}
        title="Test Modal"
        description="Some description"
        size="sm"
      >
        <p>Modal content</p>
      </ConnectedModal>,
    );
    const dialog = screen.getByRole("dialog", { name: "Test Modal" });

    expect(dialog).toHaveAccessibleDescription("Some description");
    expect(dialog).toHaveTextContent("Modal content");
  });

  it("opens when the store opens <ConnectedModal />", () => {
    render(<ConnectedModal modalId={MODAL_ID} title="Test Modal" />);

    act(() => useAppStore.getState().openModal(MODAL_ID));

    expect(screen.getByRole("dialog", { name: "Test Modal" })).toBeVisible();
  });

  it("closes in the store when <ConnectedModal /> is closed", () => {
    useAppStore.getState().openModal(MODAL_ID);
    useAppStore.getState().openModal("other");
    render(<ConnectedModal modalId={MODAL_ID} title="Test Modal" />);
    const close = screen.getByRole("button", { name: "Close" });

    fireEvent.click(close);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(useAppStore.getState().isModalOpen(MODAL_ID)).toBe(false);
    expect(useAppStore.getState().isModalOpen("other")).toBe(true);
  });
});

describe("<ConnectedModal /> - Styles", () => {
  it("renders <ConnectedModal /> with color danger", () => {
    useAppStore.getState().openModal(MODAL_ID);
    render(
      <ConnectedModal modalId={MODAL_ID} title="Test Modal" color="danger" />,
    );
    const dialog = screen.getByRole("dialog", { name: "Test Modal" });

    expect(dialog).toHaveClass(
      "bg-[color-mix(in_srgb,var(--color-zl-danger)_15%,white)]",
    );
  });
});
