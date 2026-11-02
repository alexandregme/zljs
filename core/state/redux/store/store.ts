import {
  combineReducers,
  configureStore,
  type Reducer,
} from "@reduxjs/toolkit";
import type { ReduxStore, ReduxStoreConfig } from "./store.interface";

export const createReduxStore = ({
  reducers,
  middlewares,
  preloadedState,
  coreReducers,
}: ReduxStoreConfig): ReduxStore => {
  let dynamicReducers: Record<string, Reducer> = {};

  const createReducer = () =>
    combineReducers({
      ...dynamicReducers,
      ...reducers,
      ...coreReducers,
    });

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
