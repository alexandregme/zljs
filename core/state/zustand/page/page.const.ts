import type { PageState } from "./page.interface";

export const pageInitialState: Pick<PageState, "title"> = {
  title: "",
};

export const pageDevtools = { name: "zljs", store: "page" };
