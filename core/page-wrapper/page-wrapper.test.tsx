import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { MockStoreProvider } from "@test-utils";
import { PageWrapper, usePageStore } from "@zljs/core";

const TITLE = "Orders";

const extra = (state = "from the page") => state;

const Extra = () => {
  const value = useSelector((state: { extra?: string }) => state.extra);
  return <p>{`Extra: ${value}`}</p>;
};

describe("<PageWrapper /> - Default Props", () => {
  it("renders <PageWrapper /> correctly", () => {
    render(
      <MockStoreProvider>
        <PageWrapper title={TITLE}>
          <p>Content</p>
        </PageWrapper>
      </MockStoreProvider>,
    );
    const content = screen.getByText("Content");

    expect(content).toBeInTheDocument();
    expect(usePageStore.getState().title).toBe(TITLE);
  });

  it("renders <PageWrapper /> without its optional props by default", () => {
    const dispatch = vi.fn();

    render(
      <MockStoreProvider dispatch={dispatch}>
        <PageWrapper title={TITLE}>
          <Extra />
        </PageWrapper>
      </MockStoreProvider>,
    );
    const text = screen.getByText("Extra: undefined");

    expect(text).toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalled();
  });
});

describe("<PageWrapper /> - Custom Props", () => {
  it("renders <PageWrapper /> with its reducers in the store", () => {
    render(
      <MockStoreProvider>
        <PageWrapper title={TITLE} reducers={{ extra }}>
          <Extra />
        </PageWrapper>
      </MockStoreProvider>,
    );
    const text = screen.getByText("Extra: from the page");

    expect(text).toBeInTheDocument();
  });

  it("calls initPage with the dispatch of the store when <PageWrapper /> mounts", () => {
    const dispatch = vi.fn();
    const initPage = vi.fn();

    render(
      <MockStoreProvider dispatch={dispatch}>
        <PageWrapper title={TITLE} initPage={initPage} />
      </MockStoreProvider>,
    );

    expect(initPage).toHaveBeenCalledTimes(1);
    expect(initPage).toHaveBeenCalledWith(dispatch);
  });
});
