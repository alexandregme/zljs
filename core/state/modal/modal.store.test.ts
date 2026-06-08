import { useModalStore } from "./modal.store";

const reset = () => useModalStore.setState({ modals: [] });

describe("useModalStore", () => {
  beforeEach(() => reset());

  it("starts with empty modals array", () => {
    expect(useModalStore.getState().modals).toEqual([]);
  });

  it("openModal adds a modal", () => {
    useModalStore.getState().openModal("test-modal");

    expect(useModalStore.getState().modals).toHaveLength(1);
    expect(useModalStore.getState().modals[0].name).toBe("test-modal");
  });

  it("isOpen returns true when modal is open", () => {
    useModalStore.getState().openModal("test-modal");

    expect(useModalStore.getState().isOpen("test-modal")).toBe(true);
  });

  it("isOpen returns false when modal is not open", () => {
    expect(useModalStore.getState().isOpen("test-modal")).toBe(false);
  });

  it("closeModal removes the modal", () => {
    useModalStore.getState().openModal("test-modal");
    useModalStore.getState().closeModal("test-modal");

    expect(useModalStore.getState().modals).toHaveLength(0);
    expect(useModalStore.getState().isOpen("test-modal")).toBe(false);
  });

  it("openModalWithPayload saves payload", () => {
    useModalStore.getState().openModalWithPayload("test-modal", { id: 42 });

    expect(useModalStore.getState().modals[0].payload).toEqual({ id: 42 });
  });

  it("getPayload returns the correct payload", () => {
    useModalStore.getState().openModalWithPayload("test-modal", { id: 42 });

    expect(useModalStore.getState().getPayload("test-modal")).toEqual({
      id: 42,
    });
  });

  it("getPayload returns undefined when modal is not open", () => {
    expect(useModalStore.getState().getPayload("test-modal")).toBeUndefined();
  });

  it("supports multiple modals simultaneously", () => {
    useModalStore.getState().openModal("modal-a");
    useModalStore.getState().openModal("modal-b");

    expect(useModalStore.getState().modals).toHaveLength(2);
    expect(useModalStore.getState().isOpen("modal-a")).toBe(true);
    expect(useModalStore.getState().isOpen("modal-b")).toBe(true);
  });

  it("closing one modal does not affect others", () => {
    useModalStore.getState().openModal("modal-a");
    useModalStore.getState().openModal("modal-b");

    useModalStore.getState().closeModal("modal-a");

    expect(useModalStore.getState().isOpen("modal-a")).toBe(false);
    expect(useModalStore.getState().isOpen("modal-b")).toBe(true);
  });
});
