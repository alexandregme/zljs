"use client";
import { Provider } from "react-redux";
import { combineReducers, configureStore, type Middleware, type Reducer } from "@reduxjs/toolkit";
import type { GlobalStateProps, ExtendedStore } from "./global-state.types";

let store: ExtendedStore;
let persistentReducers: Record<string, Reducer> = {};
let dynamicReducers: Record<string, Reducer> = {};

const createReducer = (coreReducers: Record<string, Reducer>) =>
  combineReducers({
    ...dynamicReducers,
    ...persistentReducers,
    ...coreReducers,
  });

const createStore = (
  reducers: Record<string, Reducer>,
  middlewares: Middleware[],
  preloadedState: Record<string, unknown>,
  coreReducers: Record<string, Reducer>,
): ExtendedStore => {
  persistentReducers = reducers;

  if (!store) {
    store = configureStore({
      reducer: createReducer(coreReducers),
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
      preloadedState,
    }) as ExtendedStore;

    store.setDynamicReducers = (newDynamicReducers = {}) => {
      dynamicReducers = newDynamicReducers;
      store.replaceReducer(createReducer(coreReducers));
    };
  } else {
    store.replaceReducer(createReducer(coreReducers));
  }

  return store;
};

export const GlobalState = ({
  children,
  reducers = {},
  middlewares = [],
  preloadedState = {},
  coreReducers = {},
}: GlobalStateProps) => {
  const reduxStore = createStore(
    reducers,
    middlewares,
    preloadedState,
    coreReducers,
  );
  return <Provider store={reduxStore}>{children}</Provider>;
};
