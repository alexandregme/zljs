import { fireEvent, render, screen, within } from "@testing-library/react";
import {
  createMockAuthAdapter,
  MOCK_APP_ID,
  MOCK_AUTH_SESSION,
} from "@test-utils";
import {
  AccessPending,
  appInitialState,
  AuthProvider,
  useAppStore,
} from "@zljs/core";

const renderAccessPending = (
  ui: React.ReactElement,
  adapter = createMockAuthAdapter(MOCK_AUTH_SESSION),
) =>
  render(
    <AuthProvider adapter={adapter} appId={MOCK_APP_ID}>
      {ui}
    </AuthProvider>,
  );

afterEach(() => {
  useAppStore.setState(appInitialState);
});

describe("<AccessPending /> - Default Props", () => {
  it("renders <AccessPending /> correctly", () => {
    renderAccessPending(<AccessPending />);
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Waiting for approval",
    });
    const message = screen.getByText(
      "Your access to this app has not been approved yet.",
    );
    const email = screen.getByText(MOCK_AUTH_SESSION.user.email);
    const signOut = screen.getByRole("button", { name: "Sign out" });

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(signOut).toBeInTheDocument();
  });

  it("renders nothing when nobody is signed in to <AccessPending />", () => {
    renderAccessPending(<AccessPending />, createMockAuthAdapter());

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("asks before signing out when the button of <AccessPending /> is clicked", () => {
    const adapter = createMockAuthAdapter(MOCK_AUTH_SESSION);
    const signOut = vi.spyOn(adapter, "signOut");
    renderAccessPending(<AccessPending />, adapter);
    const button = screen.getByRole("button", { name: "Sign out" });

    fireEvent.click(button);
    const dialog = screen.getByRole("dialog", { name: "Sign out?" });

    expect(signOut).not.toHaveBeenCalled();

    fireEvent.click(within(dialog).getByRole("button", { name: "Sign out" }));

    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

describe("<AccessPending /> - Custom Props", () => {
  it("renders <AccessPending /> with all its props", () => {
    renderAccessPending(
      <AccessPending
        title="Aguardando aprovação"
        message="Seu acesso ainda não foi liberado."
        signOutLabel="Sair"
        confirmTitle="Sair da conta?"
        confirmLabel="Sair agora"
        cancelLabel="Ficar"
        errorMessage="Não deu pra sair"
      />,
    );
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Aguardando aprovação",
    });
    const message = screen.getByText("Seu acesso ainda não foi liberado.");
    const button = screen.getByRole("button", { name: "Sair" });

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();

    fireEvent.click(button);
    const dialog = screen.getByRole("dialog", { name: "Sair da conta?" });

    expect(
      within(dialog).getByRole("button", { name: "Ficar" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("button", { name: "Sair agora" }),
    ).toBeInTheDocument();
  });
});
