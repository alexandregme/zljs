import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { appDevtools, appInitialState } from "./app.const";
import type { AppState } from "./app.interface";

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      ...appInitialState,
      startFetching: () =>
        set(
          (s) => {
            const fetchingCalls = s.fetchingCalls + 1;
            return { fetchingCalls, fetching: true };
          },
          false,
          "startFetching",
        ),
      finishFetching: () =>
        set(
          (s) => {
            const fetchingCalls = Math.max(0, s.fetchingCalls - 1);
            return { fetchingCalls, fetching: fetchingCalls > 0 };
          },
          false,
          "finishFetching",
        ),
    }),
    appDevtools,
  ),
);
