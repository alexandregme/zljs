import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { PageState } from "./page.types";

export const usePageStore = create<PageState>()(
  devtools(
    (set) => ({
      title: "",
      setTitle: (title: string) =>
        set({ title }, false, "setTitle"),
    }),
    { name: "zljs", store: "page" },
  ),
);
