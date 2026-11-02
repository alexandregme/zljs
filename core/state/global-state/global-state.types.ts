import type { ReactNode } from "react";
import type { Middleware, Reducer, Store } from "@reduxjs/toolkit";

export interface ExtendedStore extends Store {
  setDynamicReducers?: (reducers: Record<string, Reducer>) => void;
}

export interface GlobalStateProps {
  children: ReactNode;
  reducers?: Record<string, Reducer>;
  middlewares?: Middleware[];
  preloadedState?: Record<string, unknown>;
  coreReducers?: Record<string, Reducer>;
}
