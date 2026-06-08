import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AppState } from "./app.types";

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      fetchingCalls: 0,
      fetching: false,
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
    { name: "zljs", store: "app" },
  ),
);
