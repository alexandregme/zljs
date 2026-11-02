import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { routerDevtools, routerInitialState } from "./router.const";
import type { RouterState } from "./router.interface";
import { splitURLasPath } from "./router.utils";

export const useRouterStore = create<RouterState>()(
  devtools(
    (set) => ({
      ...routerInitialState,
      setRoute: (urlAsPath: string) =>
        set({ urlAsPath, query: splitURLasPath(urlAsPath) }, false, "setRoute"),
    }),
    routerDevtools,
  ),
);
