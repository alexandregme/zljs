import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { RouterState } from "./router.types";
import { splitURLasPath } from "./router.utils";

export const useRouterStore = create<RouterState>()(
  devtools(
    (set) => ({
      urlAsPath: "/",
      query: {},
      setRoute: (urlAsPath: string) =>
        set(
          { urlAsPath, query: splitURLasPath(urlAsPath) },
          false,
          "setRoute",
        ),
    }),
    { name: "zljs", store: "router" },
  ),
);
