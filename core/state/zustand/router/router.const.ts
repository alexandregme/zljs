import type { RouterState } from "./router.interface";

export const routerInitialState: Pick<RouterState, "urlAsPath" | "query"> = {
  urlAsPath: "/",
  query: {},
};

export const routerDevtools = { name: "zljs", store: "router" };
