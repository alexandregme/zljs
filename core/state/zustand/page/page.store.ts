import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { pageDevtools, pageInitialState } from "./page.const";
import type { PageState } from "./page.interface";

export const usePageStore = create<PageState>()(
  devtools(
    (set) => ({
      ...pageInitialState,
      setTitle: (title: string) => set({ title }, false, "setTitle"),
    }),
    pageDevtools,
  ),
);
