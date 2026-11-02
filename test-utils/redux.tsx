import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import {
  combineReducers,
  configureStore,
  type Dispatch,
  type Reducer,
} from "@reduxjs/toolkit";
import type { ReduxStore } from "@zljs/core";

export const MOCK_REDUCERS = {
  counter: ((state = 1) => state) as Reducer<number>,
  title: ((state = "zljs") => state) as Reducer<string>,
};

export interface MockStoreConfig {
  reducers?: Record<string, Reducer>;
  preloadedState?: Record<string, unknown>;
  dispatch?: Dispatch;
}

export interface MockStoreProviderProps extends MockStoreConfig {
  children: ReactNode;
}

/**
 * A new store on each call, so a test or story picks its own state and shares
 * nothing with the others.
 */
export const createMockStore = ({
  reducers = MOCK_REDUCERS,
  preloadedState,
  dispatch,
}: MockStoreConfig = {}): ReduxStore => {
  const store = configureStore({
    reducer: combineReducers(reducers),
    preloadedState,
  }) as ReduxStore;

  store.setDynamicReducers = (dynamicReducers = {}) => {
    store.replaceReducer(combineReducers({ ...reducers, ...dynamicReducers }));
  };

  if (dispatch) {
    store.dispatch = dispatch;
  }

  return store;
};

export const MockStoreProvider = ({
  children,
  ...config
}: MockStoreProviderProps) => {
  const [store] = useState(() => createMockStore(config));

  return <Provider store={store}>{children}</Provider>;
};
