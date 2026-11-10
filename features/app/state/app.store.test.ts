import { appInitialState } from "./app.const";
import { useAppStore } from "./app.store";

const reset = () => useAppStore.setState(appInitialState);

describe("AppStore", () => {
  beforeEach(() => reset());

  it("starts with fetching false and fetchingCalls 0", () => {
    const state = useAppStore.getState();

    expect(state.fetching).toBe(false);
    expect(state.fetchingCalls).toBe(0);
  });

  it("sets fetching to true on startFetching", () => {
    useAppStore.getState().startFetching();

    expect(useAppStore.getState().fetching).toBe(true);
    expect(useAppStore.getState().fetchingCalls).toBe(1);
  });

  it("tracks multiple concurrent fetching calls", () => {
    useAppStore.getState().startFetching();
    useAppStore.getState().startFetching();

    expect(useAppStore.getState().fetchingCalls).toBe(2);
    expect(useAppStore.getState().fetching).toBe(true);
  });

  it("keeps fetching true until all calls finish", () => {
    useAppStore.getState().startFetching();
    useAppStore.getState().startFetching();
    useAppStore.getState().finishFetching();

    expect(useAppStore.getState().fetchingCalls).toBe(1);
    expect(useAppStore.getState().fetching).toBe(true);
  });

  it("sets fetching to false when last call finishes", () => {
    useAppStore.getState().startFetching();
    useAppStore.getState().finishFetching();

    expect(useAppStore.getState().fetchingCalls).toBe(0);
    expect(useAppStore.getState().fetching).toBe(false);
  });

  it("does not go below 0 fetchingCalls", () => {
    useAppStore.getState().finishFetching();

    expect(useAppStore.getState().fetchingCalls).toBe(0);
    expect(useAppStore.getState().fetching).toBe(false);
  });

  it("starts with no modal open", () => {
    const state = useAppStore.getState();

    expect(state.modals).toEqual({});
    expect(state.isModalOpen("test-modal")).toBe(false);
    expect(state.isModalOpen("toString")).toBe(false);
    expect(state.getModalPayload("test-modal")).toBeUndefined();
  });

  it("opens a modal on openModal", () => {
    useAppStore.getState().openModal("test-modal");

    expect(Object.keys(useAppStore.getState().modals)).toEqual(["test-modal"]);
    expect(useAppStore.getState().isModalOpen("test-modal")).toBe(true);
  });

  it("keeps a modal open once when openModal is called twice", () => {
    useAppStore.getState().openModal("test-modal");
    useAppStore.getState().openModal("test-modal");

    expect(Object.keys(useAppStore.getState().modals)).toEqual(["test-modal"]);
  });

  it("saves the payload on openModalWithPayload", () => {
    useAppStore.getState().openModalWithPayload("test-modal", { id: 42 });

    expect(useAppStore.getState().isModalOpen("test-modal")).toBe(true);
    expect(useAppStore.getState().getModalPayload("test-modal")).toEqual({
      id: 42,
    });
  });

  it("closes a modal on closeModal", () => {
    useAppStore.getState().openModalWithPayload("test-modal", { id: 42 });
    useAppStore.getState().closeModal("test-modal");

    expect(useAppStore.getState().modals).toEqual({});
    expect(useAppStore.getState().isModalOpen("test-modal")).toBe(false);
    expect(
      useAppStore.getState().getModalPayload("test-modal"),
    ).toBeUndefined();
  });

  it("closes one modal without closing the others", () => {
    useAppStore.getState().openModal("modal-a");
    useAppStore.getState().openModal("modal-b");

    useAppStore.getState().closeModal("modal-a");

    expect(useAppStore.getState().isModalOpen("modal-a")).toBe(false);
    expect(useAppStore.getState().isModalOpen("modal-b")).toBe(true);
  });

  it("keeps the modals when a call starts and finishes", () => {
    useAppStore.getState().openModal("test-modal");
    useAppStore.getState().startFetching();
    useAppStore.getState().finishFetching();

    expect(useAppStore.getState().isModalOpen("test-modal")).toBe(true);
  });
});
