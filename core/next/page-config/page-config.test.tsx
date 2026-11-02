import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { MOCK_REDUCERS, MockStoreProvider } from "@test-utils";
import { ReduxProvider, usePageStore } from "@zljs/core";
import { PageConfig } from "./page-config";

const TITLE = "Orders";
const FEATURE_REDUCERS = {
  feature: (state = "from the feature") => state,
};

const Feature = () => {
  const value = useSelector((state: { feature?: string }) => state.feature);
  return <p>{value ?? "no feature yet"}</p>;
};

afterEach(() => {
  usePageStore.setState({ title: "" });
});

describe("<PageConfig /> - Default Props", () => {
  it("renders <PageConfig /> correctly", () => {
    const { container } = render(
      <MockStoreProvider>
        <PageConfig title={TITLE}>Page content</PageConfig>
      </MockStoreProvider>,
    );

    expect(container).toHaveTextContent("Page content");
    expect(container.firstElementChild).toBeNull();
    expect(usePageStore.getState().title).toBe(TITLE);
  });
});

describe("<PageConfig /> - Custom Props", () => {
  it("renders <PageConfig /> with its reducers in the store", async () => {
    render(
      <MockStoreProvider>
        <PageConfig title={TITLE} reducers={FEATURE_REDUCERS}>
          <Feature />
        </PageConfig>
      </MockStoreProvider>,
    );

    expect(await screen.findByText("from the feature")).toBeInTheDocument();
  });

  it("renders <PageConfig /> replacing the reducers of the previous page", async () => {
    const PAGE_A = { pageA: (state = "state of A") => state };
    const PAGE_B = { pageB: (state = "state of B") => state };
    const Pages = () => {
      const state = useSelector(
        (root: { counter: number; pageA?: string; pageB?: string }) => root,
      );
      return (
        <p>{`${state.counter} | ${state.pageA ?? "no A"} | ${state.pageB ?? "no B"}`}</p>
      );
    };
    const page = (key: string, reducers: typeof PAGE_A | typeof PAGE_B) => (
      <ReduxProvider reducers={{ counter: MOCK_REDUCERS.counter }}>
        <PageConfig key={key} title={TITLE} reducers={reducers}>
          <Pages />
        </PageConfig>
      </ReduxProvider>
    );
    const { rerender } = render(page("a", PAGE_A));

    expect(
      await screen.findByText("1 | state of A | no B"),
    ).toBeInTheDocument();

    rerender(page("b", PAGE_B));

    expect(
      await screen.findByText("1 | no A | state of B"),
    ).toBeInTheDocument();

    rerender(page("a", PAGE_A));

    expect(
      await screen.findByText("1 | state of A | no B"),
    ).toBeInTheDocument();
  });

  it("renders <PageConfig /> with the new title when it changes", () => {
    const { rerender } = render(
      <MockStoreProvider>
        <PageConfig title={TITLE}>Page content</PageConfig>
      </MockStoreProvider>,
    );

    rerender(
      <MockStoreProvider>
        <PageConfig title="Routes">Page content</PageConfig>
      </MockStoreProvider>,
    );

    expect(usePageStore.getState().title).toBe("Routes");
  });

  it("renders <PageConfig /> children without waiting for initPage", () => {
    const initPage = () => new Promise<void>(() => {});

    render(
      <MockStoreProvider>
        <PageConfig title={TITLE} initPage={initPage}>
          <p>Page content</p>
        </PageConfig>
      </MockStoreProvider>,
    );

    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("calls initPage once when <PageConfig /> mounts, with dispatch", () => {
    const dispatch = vi.fn();
    const initPage = vi.fn((d) => d({ type: "any" }));
    const { rerender } = render(
      <MockStoreProvider dispatch={dispatch}>
        <PageConfig title={TITLE} initPage={initPage}>
          Page content
        </PageConfig>
      </MockStoreProvider>,
    );

    rerender(
      <MockStoreProvider dispatch={dispatch}>
        <PageConfig title="Routes" initPage={initPage}>
          Page content
        </PageConfig>
      </MockStoreProvider>,
    );

    expect(initPage).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: "any" });
  });
});
