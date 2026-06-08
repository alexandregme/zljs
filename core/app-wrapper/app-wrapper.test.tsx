import { render, screen } from "@testing-library/react";
import { AppWrapper } from "./app-wrapper";
import { useAppStore } from "../state/app";

vi.mock("../toaster", () => ({
  Toaster: () => null,
}));

vi.mock("../loader", () => ({
  Loader: () => <div role="status" />,
}));

const reset = () => useAppStore.setState({ fetchingCalls: 0, fetching: false });

describe("<AppWrapper />", () => {
  beforeEach(() => reset());

  it("renders children", () => {
    render(
      <AppWrapper>
        <p>Hello</p>
      </AppWrapper>,
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders Loader", () => {
    render(
      <AppWrapper>
        <p>Content</p>
      </AppWrapper>,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
