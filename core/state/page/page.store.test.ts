import { usePageStore } from "./page.store";

afterEach(() => {
  usePageStore.setState({ title: "" });
});

describe("usePageStore", () => {
  it("starts with no title", () => {
    expect(usePageStore.getState().title).toBe("");
  });

  it("sets the title", () => {
    usePageStore.getState().setTitle("Orders");

    expect(usePageStore.getState().title).toBe("Orders");
  });
});
