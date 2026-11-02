"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../store";
import type { ReduxProviderProps } from "./redux-provider.interface";

export const ReduxProvider = ({
  children,
  reducers = {},
  middlewares = [],
  preloadedState = {},
  coreReducers = {},
}: ReduxProviderProps) => {
  const [store] = useState(() =>
    createReduxStore({
      reducers,
      middlewares,
      preloadedState,
      coreReducers,
    }),
  );

  return <Provider store={store}>{children}</Provider>;
};
