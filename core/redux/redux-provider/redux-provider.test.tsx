import { render, screen } from "@testing-library/react";
import { useSelector, useStore } from "react-redux";
import { MOCK_REDUCERS } from "@test-utils";
import { ReduxProvider } from "@zljs/core";

const { counter, title } = MOCK_REDUCERS;

const Counter = () => {
  const value = useSelector((state: { counter: number }) => state.counter);
  return <p>{`Counter: ${value}`}</p>;
};

const Title = () => {
  const value = useSelector((state: { title: string }) => state.title);
  return <p>{`Title: ${value}`}</p>;
};

describe("<ReduxProvider /> - Default Props", () => {
  it("renders <ReduxProvider /> correctly", () => {
    render(
      <ReduxProvider>
        <p>Content</p>
      </ReduxProvider>,
    );
    const content = screen.getByText("Content");

    expect(content).toBeInTheDocument();
  });
});

describe("<ReduxProvider /> - Custom Props", () => {
  it("renders <ReduxProvider /> with its reducers and core reducers in the store", () => {
    render(
      <ReduxProvider reducers={{ counter }} coreReducers={{ title }}>
        <Counter />
        <Title />
      </ReduxProvider>,
    );
    const counterText = screen.getByText("Counter: 1");
    const titleText = screen.getByText("Title: zljs");

    expect(counterText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
  });

  it("renders <ReduxProvider /> with a new store on each mount", () => {
    let lastStore: unknown;
    const Capture = () => {
      lastStore = useStore();
      return null;
    };
    const Compare = () => {
      const store = useStore();
      return <p>{`Same store: ${String(store === lastStore)}`}</p>;
    };

    const { unmount } = render(
      <ReduxProvider reducers={{ counter }}>
        <Capture />
      </ReduxProvider>,
    );
    unmount();
    render(
      <ReduxProvider reducers={{ counter }}>
        <Compare />
      </ReduxProvider>,
    );

    expect(screen.getByText("Same store: false")).toBeInTheDocument();
  });
});
