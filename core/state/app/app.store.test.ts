import { useAppStore } from "./app.store";

const reset = () => useAppStore.setState({ fetchingCalls: 0, fetching: false });

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
});
