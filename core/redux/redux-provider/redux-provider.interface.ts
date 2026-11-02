import type { ReactNode } from "react";
import type { Middleware, Reducer } from "@reduxjs/toolkit";

export interface ReduxProviderProps {
  children: ReactNode;
  reducers?: Record<string, Reducer>;
  middlewares?: Middleware[];
  preloadedState?: Record<string, unknown>;
  coreReducers?: Record<string, Reducer>;
}
