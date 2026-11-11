import { render, screen } from "@testing-library/react";
import {
  createMockAuthAdapter,
  MOCK_APP_ID,
  MOCK_AUTH_SESSION,
  MockAuthProvider,
} from "@test-utils";
import { AuthProvider, Authorized } from "@zljs/core";

const CONTENT = "Orders";
const NO_ACCESS_SESSION = {
  ...MOCK_AUTH_SESSION,
  user: { ...MOCK_AUTH_SESSION.user, hasAccess: false },
};
const NO_ROLE_SESSION = {
  ...MOCK_AUTH_SESSION,
  user: { ...MOCK_AUTH_SESSION.user, roles: { diagnostico: "admin" } },
};
const PENDING_ADAPTER = {
  ...createMockAuthAdapter(),
  onSessionChange: () => () => {},
};

describe("<Authorized /> - Default Props", () => {
  it("renders <Authorized /> correctly", () => {
    render(
      <MockAuthProvider session={MOCK_AUTH_SESSION}>
        <Authorized login={{ vendor: "supabase", providers: ["google"] }}>
          {CONTENT}
        </Authorized>
      </MockAuthProvider>,
    );
    const content = screen.getByText(CONTENT);

    expect(content).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders <Authorized /> with the children when the user has access and no role in the app", () => {
    render(
      <MockAuthProvider session={NO_ROLE_SESSION}>
        <Authorized login={{ vendor: "supabase", providers: ["google"] }}>
          {CONTENT}
        </Authorized>
      </MockAuthProvider>,
    );
    const content = screen.getByText(CONTENT);

    expect(content).toBeInTheDocument();
  });

  it("renders <Authorized /> with the login when nobody is signed in", () => {
    render(
      <MockAuthProvider>
        <Authorized login={{ vendor: "supabase", providers: ["google"] }}>
          {CONTENT}
        </Authorized>
      </MockAuthProvider>,
    );
    const title = screen.getByRole("heading", { level: 1, name: "Sign in" });
    const google = screen.getByRole("button", { name: "Continue with Google" });

    expect(title).toBeInTheDocument();
    expect(google).toBeInTheDocument();
    expect(screen.queryByText(CONTENT)).not.toBeInTheDocument();
  });

  it("renders <Authorized /> with the wait when the user has no access", () => {
    render(
      <MockAuthProvider session={NO_ACCESS_SESSION}>
        <Authorized login={{ vendor: "supabase", providers: ["google"] }}>
          {CONTENT}
        </Authorized>
      </MockAuthProvider>,
    );
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Waiting for approval",
    });
    const email = screen.getByText(NO_ACCESS_SESSION.user.email);

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(screen.queryByText(CONTENT)).not.toBeInTheDocument();
  });

  it("renders <Authorized /> with nothing while the session loads", () => {
    render(
      <AuthProvider adapter={PENDING_ADAPTER} appId={MOCK_APP_ID}>
        <Authorized login={{ vendor: "supabase", providers: ["google"] }}>
          {CONTENT}
        </Authorized>
      </AuthProvider>,
    );

    expect(screen.queryByText(CONTENT)).not.toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});

describe("<Authorized /> - Custom Props", () => {
  it("renders <Authorized /> with all its props", () => {
    render(
      <MockAuthProvider session={MOCK_AUTH_SESSION}>
        <Authorized
          roles={["admin", "manager"]}
          login={{ vendor: "supabase", providers: ["github"], title: "Entrar" }}
          accessPending={{ title: "Aguardando aprovação" }}
        >
          {CONTENT}
        </Authorized>
      </MockAuthProvider>,
    );
    const content = screen.getByText(CONTENT);

    expect(content).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders <Authorized /> with the props of login when nobody is signed in", () => {
    render(
      <MockAuthProvider>
        <Authorized
          login={{
            vendor: "supabase",
            providers: ["github"],
            title: "Entrar",
            providerLabel: "Continuar com",
          }}
          accessPending={{ title: "Aguardando aprovação" }}
        >
          {CONTENT}
        </Authorized>
      </MockAuthProvider>,
    );
    const title = screen.getByRole("heading", { level: 1, name: "Entrar" });
    const github = screen.getByRole("button", { name: "Continuar com GitHub" });

    expect(title).toBeInTheDocument();
    expect(github).toBeInTheDocument();
  });

  it("renders <Authorized /> with the props of accessPending when the user has no access", () => {
    render(
      <MockAuthProvider session={NO_ACCESS_SESSION}>
        <Authorized
          login={{ vendor: "supabase", providers: ["github"], title: "Entrar" }}
          accessPending={{
            title: "Aguardando aprovação",
            signOutLabel: "Sair",
          }}
        >
          {CONTENT}
        </Authorized>
      </MockAuthProvider>,
    );
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Aguardando aprovação",
    });
    const signOut = screen.getByRole("button", { name: "Sair" });

    expect(title).toBeInTheDocument();
    expect(signOut).toBeInTheDocument();
  });

  it("renders <Authorized /> with the wait when roles leave the user out", () => {
    render(
      <MockAuthProvider session={MOCK_AUTH_SESSION}>
        <Authorized
          roles={["manager"]}
          login={{ vendor: "supabase", providers: ["google"] }}
        >
          {CONTENT}
        </Authorized>
      </MockAuthProvider>,
    );
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Waiting for approval",
    });

    expect(title).toBeInTheDocument();
    expect(screen.queryByText(CONTENT)).not.toBeInTheDocument();
  });

  it("renders <Authorized /> with the wait when roles are asked and the user has no role in the app", () => {
    render(
      <MockAuthProvider session={NO_ROLE_SESSION}>
        <Authorized
          roles={["admin"]}
          login={{ vendor: "supabase", providers: ["google"] }}
        >
          {CONTENT}
        </Authorized>
      </MockAuthProvider>,
    );
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Waiting for approval",
    });

    expect(title).toBeInTheDocument();
    expect(screen.queryByText(CONTENT)).not.toBeInTheDocument();
  });
});
