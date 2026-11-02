import type { Middleware, Reducer, Store } from "@reduxjs/toolkit";

export interface ReduxStore extends Store {
  setDynamicReducers?: (reducers: Record<string, Reducer>) => void;
}

export interface ReduxStoreConfig {
  reducers: Record<string, Reducer>;
  middlewares: Middleware[];
  preloadedState: Record<string, unknown>;
  coreReducers: Record<string, Reducer>;
}
