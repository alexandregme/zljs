import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMockAuthAdapter, MOCK_APP_ID } from "@test-utils";
import { AuthProvider, Login, useToastStore } from "@zljs/core";

const renderLogin = (
  ui: React.ReactElement,
  adapter = createMockAuthAdapter(),
) =>
  render(
    <AuthProvider adapter={adapter} appId={MOCK_APP_ID}>
      {ui}
    </AuthProvider>,
  );

afterEach(() => {
  useToastStore.setState({ toasts: [] });
});

describe("<Login /> - Default Props", () => {
  it("renders <Login /> correctly", () => {
    renderLogin(<Login vendor="supabase" providers={["google"]} />);
    const title = screen.getByRole("heading", { level: 1, name: "Sign in" });
    const message = screen.getByText("Choose how to sign in");
    const google = screen.getByRole("button", { name: "Continue with Google" });

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(google).toBeInTheDocument();
  });

  it("signs in with the provider when a provider of <Login /> is clicked", () => {
    const adapter = createMockAuthAdapter();
    const signInWithOAuth = vi.spyOn(adapter, "signInWithOAuth");
    renderLogin(
      <Login vendor="supabase" providers={["google", "github"]} />,
      adapter,
    );
    const github = screen.getByRole("button", { name: "Continue with GitHub" });

    fireEvent.click(github);

    expect(signInWithOAuth).toHaveBeenCalledTimes(1);
    expect(signInWithOAuth).toHaveBeenCalledWith("github");
  });

  it("sends an error toast when a provider of <Login /> fails", async () => {
    const adapter = createMockAuthAdapter();
    vi.spyOn(adapter, "signInWithOAuth").mockRejectedValue(
      new Error("provider off"),
    );
    renderLogin(<Login vendor="supabase" providers={["google"]} />, adapter);
    const google = screen.getByRole("button", { name: "Continue with Google" });

    fireEvent.click(google);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    const [toast] = useToastStore.getState().toasts;

    expect(toast?.type).toBe("error");
    expect(toast?.message).toBe("Could not sign in. Try again.");
  });
});

describe("<Login /> - Custom Props", () => {
  it("renders <Login /> with all its props", async () => {
    const adapter = createMockAuthAdapter();
    vi.spyOn(adapter, "signInWithOAuth").mockRejectedValue(
      new Error("provider off"),
    );
    renderLogin(
      <Login
        vendor="supabase"
        providers={["google", "apple"]}
        title="Ruralíssima"
        message="Escolha como entrar"
        providerLabel="Continuar com"
        errorMessage="Não deu pra entrar"
      />,
      adapter,
    );
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Ruralíssima",
    });
    const message = screen.getByText("Escolha como entrar");
    const google = screen.getByRole("button", { name: "Continuar com Google" });
    const apple = screen.getByRole("button", { name: "Continuar com Apple" });

    fireEvent.click(google);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    const [toast] = useToastStore.getState().toasts;

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(apple).toBeInTheDocument();
    expect(toast?.message).toBe("Não deu pra entrar");
  });
});
