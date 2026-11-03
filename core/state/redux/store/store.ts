import {
  combineReducers,
  configureStore,
  type Reducer,
} from "@reduxjs/toolkit";
import type { ReduxStore, ReduxStoreConfig } from "./store.interface";

// Redux warns when combineReducers gets no reducers, so a store with none
// (an app without redux state yet) keeps an empty state instead.
const emptyReducer: Reducer<Record<string, unknown>> = (state = {}) => state;

export const createReduxStore = ({
  reducers,
  middlewares,
  preloadedState,
  coreReducers,
}: ReduxStoreConfig): ReduxStore => {
  let dynamicReducers: Record<string, Reducer> = {};

  const createReducer = () => {
    const all = { ...dynamicReducers, ...reducers, ...coreReducers };
    return Object.keys(all).length ? combineReducers(all) : emptyReducer;
  };

  const store = configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares),
    preloadedState,
  }) as ReduxStore;

  store.setDynamicReducers = (newDynamicReducers = {}) => {
    dynamicReducers = newDynamicReducers;
    store.replaceReducer(createReducer());
  };

  return store;
};
