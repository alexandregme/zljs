import { act, render, screen } from "@testing-library/react";
import {
  MOCK_APP_ID,
  MOCK_AUTH_SESSION,
  createMockAuthAdapter,
} from "@test-utils";
import {
  appInitialState,
  useAppStore,
  useAuth,
  useToastStore,
  ZustandProviders,
} from "@zljs/core";

const AUTH = {
  adapter: createMockAuthAdapter(MOCK_AUTH_SESSION),
  appId: MOCK_APP_ID,
};

const Role = () => {
  const { role } = useAuth();
  return <p>{`Role: ${role}`}</p>;
};

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

  it("renders <ZustandProviders /> without its optional props by default", () => {
    render(
      <ZustandProviders>
        <Role />
      </ZustandProviders>,
    );
    const role = screen.getByText("Role: null");

    expect(role).toBeInTheDocument();
  });
});

describe("<ZustandProviders /> - Custom Props", () => {
  it("renders <ZustandProviders /> with all its props", () => {
    render(
      <ZustandProviders auth={AUTH}>
        <Role />
      </ZustandProviders>,
    );
    const role = screen.getByText("Role: admin");

    expect(role).toBeInTheDocument();
  });
});
