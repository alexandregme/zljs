import { render, screen } from "@testing-library/react";
import { Loader } from "./loader";
import { useAppStore } from "../state/app";

vi.mock("../spinner", () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

const reset = () => useAppStore.setState({ fetchingCalls: 0, fetching: false });

describe("<Loader />", () => {
  beforeEach(() => reset());

  it("does not render when not fetching", () => {
    render(<Loader />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders overlay when fetching", () => {
    useAppStore.getState().startFetching();

    render(<Loader />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders Spinner", () => {
    useAppStore.getState().startFetching();

    render(<Loader />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("has default aria-label Loading", () => {
    useAppStore.getState().startFetching();

    render(<Loader />);

    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("accepts custom label", () => {
    useAppStore.getState().startFetching();

    render(<Loader label="Carregando" />);

    expect(screen.getByLabelText("Carregando")).toBeInTheDocument();
  });
});
