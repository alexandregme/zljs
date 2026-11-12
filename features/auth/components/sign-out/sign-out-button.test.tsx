import { act, fireEvent, render, screen, within } from "@testing-library/react";
import {
  createMockAuthAdapter,
  MOCK_APP_ID,
  MOCK_AUTH_SESSION,
} from "@test-utils";
import {
  appInitialState,
  AuthProvider,
  SignOutButton,
  useAppStore,
} from "@zljs/core";

const renderSignOut = (
  ui: React.ReactElement,
  adapter = createMockAuthAdapter(MOCK_AUTH_SESSION),
) =>
  render(
    <AuthProvider adapter={adapter} appId={MOCK_APP_ID}>
      {ui}
    </AuthProvider>,
  );

afterEach(() => {
  act(() => {
    useAppStore.setState(appInitialState);
  });
});

describe("<SignOutButton /> - Default Props", () => {
  it("renders <SignOutButton /> correctly", () => {
    renderSignOut(<SignOutButton />);
    const button = screen.getByRole("button", { name: "Sign out" });

    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("asks before signing out when <SignOutButton /> is clicked", () => {
    const adapter = createMockAuthAdapter(MOCK_AUTH_SESSION);
    const signOut = vi.spyOn(adapter, "signOut");
    renderSignOut(<SignOutButton />, adapter);
    const button = screen.getByRole("button", { name: "Sign out" });

    fireEvent.click(button);
    const dialog = screen.getByRole("dialog", { name: "Sign out?" });

    expect(
      within(dialog).getByRole("button", { name: "Cancel" }),
    ).toBeInTheDocument();
    expect(signOut).not.toHaveBeenCalled();

    fireEvent.click(within(dialog).getByRole("button", { name: "Sign out" }));

    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

describe("<SignOutButton /> - Custom Props", () => {
  it("renders <SignOutButton /> with all its props", () => {
    renderSignOut(
      <SignOutButton
        label="Sair"
        confirmTitle="Sair da conta?"
        confirmLabel="Sair agora"
        cancelLabel="Ficar"
        errorMessage="Não deu pra sair"
      />,
    );
    const button = screen.getByRole("button", { name: "Sair" });

    fireEvent.click(button);
    const dialog = screen.getByRole("dialog", { name: "Sair da conta?" });

    expect(
      within(dialog).getByRole("button", { name: "Ficar" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("button", { name: "Sair agora" }),
    ).toBeInTheDocument();
  });

  it("calls onSignOut when the modal of <SignOutButton /> is confirmed, with no <AuthProvider />", () => {
    const handleSignOut = vi.fn();
    render(<SignOutButton onSignOut={handleSignOut} />);

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    expect(handleSignOut).not.toHaveBeenCalled();

    const dialog = screen.getByRole("dialog", { name: "Sign out?" });
    fireEvent.click(within(dialog).getByRole("button", { name: "Sign out" }));

    expect(handleSignOut).toHaveBeenCalledTimes(1);
  });
});

describe("<SignOutButton /> - Styles", () => {
  it("renders <SignOutButton /> with size lg", () => {
    renderSignOut(<SignOutButton size="lg" />);
    const button = screen.getByRole("button", { name: "Sign out" });

    expect(button).toHaveClass("p-2");
  });

  it("renders <SignOutButton /> in the color of the text around it", () => {
    renderSignOut(<SignOutButton />);
    const button = screen.getByRole("button", { name: "Sign out" });

    expect(button).toHaveClass("text-current");
  });
});
