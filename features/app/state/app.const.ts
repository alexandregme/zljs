import type { AppState } from "./app.interface";

export const appInitialState: Pick<AppState, "fetchingCalls" | "fetching"> = {
  fetchingCalls: 0,
  fetching: false,
};

export const appDevtools = { name: "zljs", store: "app" };
