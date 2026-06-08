import type { ReactNode } from "react";
import type { Dispatch, Reducer } from "@reduxjs/toolkit";

export type InitPageFunction = (dispatch: Dispatch) => void;

export interface PageWrapperProps {
  title: string;
  children?: ReactNode;
  reducers?: Record<string, Reducer>;
  initPage?: InitPageFunction;
}
