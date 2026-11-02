import type { Middleware } from "@reduxjs/toolkit";
import { createMockStore, MOCK_REDUCERS } from "@test-utils";
import type { ReduxStoreConfig } from "./store.types";

const { counter, title } = MOCK_REDUCERS;

const CONFIG: ReduxStoreConfig = {
  reducers: { counter },
  middlewares: [],
  preloadedState: {},
  coreReducers: {},
};

// The store is a module singleton, so each test loads a fresh copy of the module.
const loadGetReduxStore = async () => {
  vi.resetModules();
  const { getReduxStore } = await import("./store");
  return getReduxStore;
};

describe("getReduxStore", () => {
  it("creates the store with the reducers", async () => {
    const getReduxStore = await loadGetReduxStore();

    const store = getReduxStore({
      ...CONFIG,
      coreReducers: { title },
    });

    expect(store.getState()).toEqual({ counter: 1, title: "zljs" });
  });

  it("creates the store with the preloaded state", async () => {
    const getReduxStore = await loadGetReduxStore();

    const store = getReduxStore({
      ...CONFIG,
      preloadedState: { counter: 5 },
    });

    expect(store.getState()).toEqual({ counter: 5 });
  });

  it("creates the store with the middlewares", async () => {
    const getReduxStore = await loadGetReduxStore();
    const spy = vi.fn();
    const logger: Middleware = () => (next) => (action) => {
      spy();
      return next(action);
    };

    const store = getReduxStore({ ...CONFIG, middlewares: [logger] });
    store.dispatch({ type: "any" });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("returns the same store and swaps the reducers on later calls", async () => {
    const getReduxStore = await loadGetReduxStore();
    const store = getReduxStore(CONFIG);

    const sameStore = getReduxStore({ ...CONFIG, reducers: { title } });

    expect(sameStore).toBe(store);
    expect(store.getState()).toEqual({ title: "zljs" });
  });

  it("ignores the preloaded state on later calls", async () => {
    const getReduxStore = await loadGetReduxStore();
    const store = getReduxStore(CONFIG);

    getReduxStore({ ...CONFIG, preloadedState: { counter: 5 } });

    expect(store.getState()).toEqual({ counter: 1 });
  });

  it("adds and replaces reducers with setDynamicReducers", async () => {
    const getReduxStore = await loadGetReduxStore();
    const store = getReduxStore(CONFIG);

    store.setDynamicReducers?.({ title });
    expect(store.getState()).toEqual({ counter: 1, title: "zljs" });

    store.setDynamicReducers?.({});
    expect(store.getState()).toEqual({ counter: 1 });
  });

  it("keeps the persistent and core reducers with setDynamicReducers", async () => {
    const getReduxStore = await loadGetReduxStore();
    const extra = (state = "dynamic") => state;
    const store = getReduxStore({ ...CONFIG, coreReducers: { title } });

    store.setDynamicReducers?.({ extra });

    expect(store.getState()).toEqual({
      counter: 1,
      title: "zljs",
      extra: "dynamic",
    });
  });
});

describe("createMockStore", () => {
  it("creates a new store on each call", () => {
    const first = createMockStore();
    const second = createMockStore();

    expect(first).not.toBe(second);
  });

  it("creates the store with the mock reducers by default", () => {
    const store = createMockStore();

    expect(store.getState()).toEqual({ counter: 1, title: "zljs" });
  });

  it("creates the store with the reducers it receives", () => {
    const store = createMockStore({ reducers: { counter } });

    expect(store.getState()).toEqual({ counter: 1 });
  });

  it("creates the store with the preloaded state on every call", () => {
    const store = createMockStore({ preloadedState: { counter: 5 } });

    expect(store.getState()).toEqual({ counter: 5, title: "zljs" });
  });

  it("adds and replaces reducers with setDynamicReducers", () => {
    const store = createMockStore({ reducers: { counter } });

    store.setDynamicReducers?.({ title });
    expect(store.getState()).toEqual({ counter: 1, title: "zljs" });

    store.setDynamicReducers?.({});
    expect(store.getState()).toEqual({ counter: 1 });
  });

  it("replaces dispatch with the one it receives", () => {
    const dispatch = vi.fn();
    const store = createMockStore({ dispatch });

    store.dispatch({ type: "any" });

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
