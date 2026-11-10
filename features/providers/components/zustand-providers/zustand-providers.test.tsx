import { appInitialState } from "@test-utils";
import { act, render, screen } from "@testing-library/react";
import { useAppStore, useToastStore, ZustandProviders } from "@zljs/core";

afterEach(() => {
  act(() => {
    useAppStore.setState(appInitialState);
  });
});

describe("<ZustandProviders /> - Default Props", () => {
  it("renders <ZustandProviders /> correctly", async () => {
    render(
      <ZustandProviders>
        <p>Content</p>
      </ZustandProviders>,
    );
    const content = screen.getByText("Content");

    act(() => {
      useAppStore.getState().startFetching();
      useToastStore.getState().success("Saved");
    });

    expect(content).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "Loading" })).toBeVisible();
    expect(await screen.findByText("Saved")).toBeInTheDocument();
  });
});
