"use client";
import { Provider } from "react-redux";
import { getReduxStore } from "../store";
import type { ReduxProviderProps } from "./redux-provider.interface";

export const ReduxProvider = ({
  children,
  reducers = {},
  middlewares = [],
  preloadedState = {},
  coreReducers = {},
}: ReduxProviderProps) => {
  const store = getReduxStore({
    reducers,
    middlewares,
    preloadedState,
    coreReducers,
  });
  return <Provider store={store}>{children}</Provider>;
};
