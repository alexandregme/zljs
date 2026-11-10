import { fireEvent, render, screen } from "@testing-library/react";
import {
  createMockAuthAdapter,
  MOCK_APP_ID,
  MOCK_AUTH_SESSION,
} from "@test-utils";
import {
  AuthProvider,
  Button,
  getAuthSession,
  Text,
  useAuth,
} from "@zljs/core";

const CREDENTIALS = { email: "ana@zljs.dev", password: "secret" };

const Session = () => {
  const { status, user, role, signInWithPassword, signOut } = useAuth();

  const signIn = () => {
    void signInWithPassword(CREDENTIALS);
  };

  const leave = () => {
    void signOut();
  };

  return (
    <>
      <Text>{`Status: ${status}`}</Text>
      <Text>{`User: ${user?.email ?? "none"}`}</Text>
      <Text>{`Role: ${role ?? "none"}`}</Text>
      <Button onClick={signIn}>Sign in</Button>
      <Button onClick={leave}>Sign out</Button>
    </>
  );
};

describe("<AuthProvider /> - Default Props", () => {
  it("renders <AuthProvider /> correctly", () => {
    render(
      <AuthProvider adapter={createMockAuthAdapter()} appId={MOCK_APP_ID}>
        <Session />
      </AuthProvider>,
    );
    const status = screen.getByText("Status: unauthenticated");
    const user = screen.getByText("User: none");
    const role = screen.getByText("Role: none");

    expect(status).toBeInTheDocument();
    expect(user).toBeInTheDocument();
    expect(role).toBeInTheDocument();
  });
});

describe("<AuthProvider /> - Custom Props", () => {
  it("renders <AuthProvider /> with the session of its adapter", () => {
    render(
      <AuthProvider
        adapter={createMockAuthAdapter(MOCK_AUTH_SESSION)}
        appId={MOCK_APP_ID}
      >
        <Session />
      </AuthProvider>,
    );
    const status = screen.getByText("Status: authenticated");
    const user = screen.getByText("User: ana@zljs.dev");
    const role = screen.getByText("Role: admin");

    expect(status).toBeInTheDocument();
    expect(user).toBeInTheDocument();
    expect(role).toBeInTheDocument();
  });

  it("renders <AuthProvider /> with no role when the user has none in its appId", () => {
    render(
      <AuthProvider
        adapter={createMockAuthAdapter(MOCK_AUTH_SESSION)}
        appId="diagnostico"
      >
        <Session />
      </AuthProvider>,
    );
    const status = screen.getByText("Status: authenticated");
    const role = screen.getByText("Role: none");

    expect(status).toBeInTheDocument();
    expect(role).toBeInTheDocument();
  });

  it("updates <AuthProvider /> when the session of its adapter changes", async () => {
    render(
      <AuthProvider adapter={createMockAuthAdapter()} appId={MOCK_APP_ID}>
        <Session />
      </AuthProvider>,
    );
    const signIn = screen.getByRole("button", { name: "Sign in" });
    const signOut = screen.getByRole("button", { name: "Sign out" });

    fireEvent.click(signIn);

    expect(
      await screen.findByText("Status: authenticated"),
    ).toBeInTheDocument();

    fireEvent.click(signOut);

    expect(
      await screen.findByText("Status: unauthenticated"),
    ).toBeInTheDocument();
  });

  it("clears the session and stops listening when <AuthProvider /> unmounts", async () => {
    const adapter = createMockAuthAdapter(MOCK_AUTH_SESSION);
    const { unmount } = render(
      <AuthProvider adapter={adapter} appId={MOCK_APP_ID}>
        <Session />
      </AuthProvider>,
    );

    unmount();
    await adapter.signInWithPassword(CREDENTIALS);

    expect(getAuthSession()).toBeNull();
  });
});
