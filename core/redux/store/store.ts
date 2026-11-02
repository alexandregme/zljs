import {
  combineReducers,
  configureStore,
  type Reducer,
} from "@reduxjs/toolkit";
import type { ReduxStore, ReduxStoreConfig } from "./store.types";

let store: ReduxStore;
let persistentReducers: Record<string, Reducer> = {};
let dynamicReducers: Record<string, Reducer> = {};

const createReducer = (coreReducers: Record<string, Reducer>) =>
  combineReducers({
    ...dynamicReducers,
    ...persistentReducers,
    ...coreReducers,
  });

export const getReduxStore = ({
  reducers,
  middlewares,
  preloadedState,
  coreReducers,
}: ReduxStoreConfig): ReduxStore => {
  persistentReducers = reducers;

  if (!store) {
    store = configureStore({
      reducer: createReducer(coreReducers),
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
      preloadedState,
    }) as ReduxStore;

    store.setDynamicReducers = (newDynamicReducers = {}) => {
      dynamicReducers = newDynamicReducers;
      store.replaceReducer(createReducer(coreReducers));
    };
  } else {
    store.replaceReducer(createReducer(coreReducers));
  }

  return store;
};
