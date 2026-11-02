import type { Middleware } from "@reduxjs/toolkit";
import { createMockStore, MOCK_REDUCERS } from "@test-utils";
import { createReduxStore } from "./store";
import type { ReduxStoreConfig } from "./store.types";

const { counter, title } = MOCK_REDUCERS;

const CONFIG: ReduxStoreConfig = {
  reducers: { counter },
  middlewares: [],
  preloadedState: {},
  coreReducers: {},
};

describe("createReduxStore", () => {
  it("creates the store with the reducers", () => {
    const store = createReduxStore({
      ...CONFIG,
      coreReducers: { title },
    });

    expect(store.getState()).toEqual({ counter: 1, title: "zljs" });
  });

  it("creates the store with the preloaded state", () => {
    const store = createReduxStore({
      ...CONFIG,
      preloadedState: { counter: 5 },
    });

    expect(store.getState()).toEqual({ counter: 5 });
  });

  it("creates the store with the middlewares", () => {
    const spy = vi.fn();
    const logger: Middleware = () => (next) => (action) => {
      spy();
      return next(action);
    };

    const store = createReduxStore({ ...CONFIG, middlewares: [logger] });
    store.dispatch({ type: "any" });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("creates a new store on each call, with nothing shared", () => {
    const first = createReduxStore(CONFIG);
    const second = createReduxStore({ ...CONFIG, reducers: { title } });

    first.setDynamicReducers({ title });

    expect(first).not.toBe(second);
    expect(first.getState()).toEqual({ counter: 1, title: "zljs" });
    expect(second.getState()).toEqual({ title: "zljs" });
  });

  it("adds and replaces reducers with setDynamicReducers", () => {
    const store = createReduxStore(CONFIG);

    store.setDynamicReducers({ title });
    expect(store.getState()).toEqual({ counter: 1, title: "zljs" });

    store.setDynamicReducers({});
    expect(store.getState()).toEqual({ counter: 1 });
  });

  it("keeps the persistent and core reducers with setDynamicReducers", () => {
    const extra = (state = "dynamic") => state;
    const store = createReduxStore({ ...CONFIG, coreReducers: { title } });

    store.setDynamicReducers({ extra });

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

    store.setDynamicReducers({ title });
    expect(store.getState()).toEqual({ counter: 1, title: "zljs" });

    store.setDynamicReducers({});
    expect(store.getState()).toEqual({ counter: 1 });
  });

  it("replaces dispatch with the one it receives", () => {
    const dispatch = vi.fn();
    const store = createMockStore({ dispatch });

    store.dispatch({ type: "any" });

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
