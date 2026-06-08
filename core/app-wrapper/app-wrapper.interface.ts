import type { ReactNode } from "react";
import type { Middleware, Reducer } from "@reduxjs/toolkit";

export interface AppWrapperProps {
  children: ReactNode;
  reducers?: Record<string, Reducer>;
  middlewares?: Middleware[];
  coreReducers?: Record<string, Reducer>;
}
