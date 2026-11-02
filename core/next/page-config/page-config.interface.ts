import type { ReactNode } from "react";
import type { Reducer, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export type InitPageFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<any, undefined, UnknownAction>,
) => void;

export interface PageConfigProps {
  children: ReactNode;
  title: string;
  reducers?: Record<string, Reducer>;
  initPage?: InitPageFunction;
}
