import { useRouterStore } from "./router.store";

afterEach(() => {
  useRouterStore.getState().setRoute("/");
});

describe("useRouterStore", () => {
  it("starts at the root, with no query", () => {
    expect(useRouterStore.getState().urlAsPath).toBe("/");
    expect(useRouterStore.getState().query).toEqual({});
  });

  it("sets the path and its query", () => {
    useRouterStore.getState().setRoute("/orders?id=7&open=true");

    expect(useRouterStore.getState().urlAsPath).toBe("/orders?id=7&open=true");
    expect(useRouterStore.getState().query).toEqual({ id: "7", open: "true" });
  });
});
