import { act, render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import {
  createMockAuthAdapter,
  MOCK_APP_ID,
  MOCK_AUTH_SESSION,
  MockRouteProvider,
  MOCK_REDUCERS,
} from "@test-utils";
import {
  appInitialState,
  useAppStore,
  useAuth,
  useRouterStore,
  useToastStore,
} from "@zljs/core";
import { AppProviders } from "./app-providers";

const Role = () => {
  const { role } = useAuth();
  return <p>{`Role: ${role}`}</p>;
};

const Title = () => {
  const value = useSelector((state: { title: string }) => state.title);
  return <p>{value}</p>;
};

afterEach(() => {
  act(() => {
    useAppStore.setState(appInitialState);
    useRouterStore.getState().setRoute("/");
  });
  window.history.pushState({}, "", "/");
});

describe("<AppProviders /> - Default Props", () => {
  it("renders <AppProviders /> correctly", () => {
    render(
      <AppProviders>
        <p>Content</p>
      </AppProviders>,
    );
    const content = screen.getByText("Content");

    expect(content).toBeInTheDocument();
  });

  it("renders <AppProviders /> without the loader when nothing is fetching", () => {
    render(
      <AppProviders>
        <p>Content</p>
      </AppProviders>,
    );
    const status = screen.queryByRole("status");

    expect(status).not.toBeInTheDocument();
  });

  it("renders <AppProviders /> without touching the route when there is no pathname", () => {
    render(
      <AppProviders>
        <p>Content</p>
      </AppProviders>,
    );

    expect(useRouterStore.getState().urlAsPath).toBe("/");
  });
});

describe("<AppProviders /> - Custom Props", () => {
  it("renders <AppProviders /> with auth", () => {
    const adapter = createMockAuthAdapter(MOCK_AUTH_SESSION);
    render(
      <AppProviders auth={{ adapter, appId: MOCK_APP_ID }}>
        <Role />
      </AppProviders>,
    );
    const role = screen.getByText("Role: admin");

    expect(role).toBeInTheDocument();
  });

  it("renders <AppProviders /> with its reducers in the store", () => {
    render(
      <AppProviders reducers={MOCK_REDUCERS}>
        <Title />
      </AppProviders>,
    );
    const title = screen.getByText("zljs");

    expect(title).toBeInTheDocument();
  });

  it("renders <AppProviders /> writing the route to the router store", () => {
    window.history.pushState({}, "", "/orders?id=7");
    const { rerender } = render(
      <MockRouteProvider pathname="/orders">
        <AppProviders>
          <p>Content</p>
        </AppProviders>
      </MockRouteProvider>,
    );

    expect(useRouterStore.getState().urlAsPath).toBe("/orders?id=7");
    expect(useRouterStore.getState().query).toEqual({ id: "7" });

    window.history.pushState({}, "", "/routes");
    rerender(
      <MockRouteProvider pathname="/routes">
        <AppProviders>
          <p>Content</p>
        </AppProviders>
      </MockRouteProvider>,
    );

    expect(useRouterStore.getState().urlAsPath).toBe("/routes");
    expect(useRouterStore.getState().query).toEqual({});
  });

  it("renders <AppProviders /> with the loader while fetching", () => {
    render(
      <AppProviders>
        <p>Content</p>
      </AppProviders>,
    );

    act(() => useAppStore.getState().startFetching());

    expect(screen.getByRole("status", { name: "Loading" })).toBeVisible();
  });

  it("renders <AppProviders /> with the toaster showing a toast", async () => {
    render(
      <AppProviders>
        <p>Content</p>
      </AppProviders>,
    );

    act(() => {
      useToastStore.getState().success("Saved");
    });

    expect(await screen.findByText("Saved")).toBeInTheDocument();
  });
});
