import type { AppState } from "./app.interface";

export const appInitialState: Pick<
  AppState,
  "fetchingCalls" | "fetching" | "modals"
> = {
  fetchingCalls: 0,
  fetching: false,
  modals: {},
};

export const appDevtools = { name: "zljs", store: "app" };
