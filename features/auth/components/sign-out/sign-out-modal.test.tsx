import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import {
  createMockAuthAdapter,
  MOCK_APP_ID,
  MOCK_AUTH_SESSION,
} from "@test-utils";
import {
  appInitialState,
  AuthProvider,
  useAppStore,
  useToastStore,
} from "@zljs/core";
import { SignOutModal } from "./sign-out-modal";
import { SIGN_OUT_MODAL_ID } from "./sign-out-modal.const";

const renderOpenModal = (
  ui: React.ReactElement,
  adapter = createMockAuthAdapter(MOCK_AUTH_SESSION),
) => {
  useAppStore.getState().openModal(SIGN_OUT_MODAL_ID);

  return render(
    <AuthProvider adapter={adapter} appId={MOCK_APP_ID}>
      {ui}
    </AuthProvider>,
  );
};

afterEach(() => {
  act(() => {
    useAppStore.setState(appInitialState);
    useToastStore.setState({ toasts: [] });
  });
});

describe("<SignOutModal /> - Default Props", () => {
  it("renders <SignOutModal /> correctly", () => {
    renderOpenModal(<SignOutModal />);
    const dialog = screen.getByRole("dialog", { name: "Sign out?" });

    expect(
      within(dialog).getByRole("button", { name: "Cancel" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("button", { name: "Sign out" }),
    ).toBeInTheDocument();
  });

  it("renders nothing when <SignOutModal /> is not open in the store", () => {
    render(
      <AuthProvider
        adapter={createMockAuthAdapter(MOCK_AUTH_SESSION)}
        appId={MOCK_APP_ID}
      >
        <SignOutModal />
      </AuthProvider>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("signs out and closes when <SignOutModal /> is confirmed", () => {
    const adapter = createMockAuthAdapter(MOCK_AUTH_SESSION);
    const signOut = vi.spyOn(adapter, "signOut");
    renderOpenModal(<SignOutModal />, adapter);
    const confirm = screen.getByRole("button", { name: "Sign out" });

    fireEvent.click(confirm);

    expect(signOut).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(useAppStore.getState().isModalOpen(SIGN_OUT_MODAL_ID)).toBe(false);
  });

  it("stays signed in and closes when <SignOutModal /> is cancelled", () => {
    const adapter = createMockAuthAdapter(MOCK_AUTH_SESSION);
    const signOut = vi.spyOn(adapter, "signOut");
    renderOpenModal(<SignOutModal />, adapter);
    const cancel = screen.getByRole("button", { name: "Cancel" });

    fireEvent.click(cancel);

    expect(signOut).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(useAppStore.getState().isModalOpen(SIGN_OUT_MODAL_ID)).toBe(false);
  });

  it("sends an error toast when <SignOutModal /> can't sign out", async () => {
    const adapter = createMockAuthAdapter(MOCK_AUTH_SESSION);
    vi.spyOn(adapter, "signOut").mockRejectedValue(new Error("offline"));
    renderOpenModal(<SignOutModal />, adapter);
    const confirm = screen.getByRole("button", { name: "Sign out" });

    fireEvent.click(confirm);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    const [toast] = useToastStore.getState().toasts;

    expect(toast?.type).toBe("error");
    expect(toast?.message).toBe("Could not sign out. Try again.");
  });
});

describe("<SignOutModal /> - Custom Props", () => {
  it("renders <SignOutModal /> with all its props", async () => {
    const adapter = createMockAuthAdapter(MOCK_AUTH_SESSION);
    vi.spyOn(adapter, "signOut").mockRejectedValue(new Error("offline"));
    renderOpenModal(
      <SignOutModal
        title="Sair da conta?"
        confirmLabel="Sair agora"
        cancelLabel="Ficar"
        errorMessage="Não deu pra sair"
      />,
      adapter,
    );
    const dialog = screen.getByRole("dialog", { name: "Sair da conta?" });
    const cancel = within(dialog).getByRole("button", { name: "Ficar" });
    const confirm = within(dialog).getByRole("button", { name: "Sair agora" });

    expect(cancel).toBeInTheDocument();

    fireEvent.click(confirm);

    await waitFor(() => {
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
    const [toast] = useToastStore.getState().toasts;

    expect(toast?.message).toBe("Não deu pra sair");
  });

  it("calls onSignOut instead of the adapter when <SignOutModal /> gets one", () => {
    const adapter = createMockAuthAdapter(MOCK_AUTH_SESSION);
    const signOut = vi.spyOn(adapter, "signOut");
    const handleSignOut = vi.fn();
    renderOpenModal(<SignOutModal onSignOut={handleSignOut} />, adapter);

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    expect(handleSignOut).toHaveBeenCalledTimes(1);
    expect(signOut).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("needs no <AuthProvider /> when <SignOutModal /> gets onSignOut", () => {
    const handleSignOut = vi.fn();
    useAppStore.getState().openModal(SIGN_OUT_MODAL_ID);
    render(<SignOutModal onSignOut={handleSignOut} />);

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    expect(handleSignOut).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["rejects", () => Promise.reject(new Error("offline"))],
    [
      "throws",
      () => {
        throw new Error("offline");
      },
    ],
  ])(
    "sends an error toast when the onSignOut of <SignOutModal /> %s",
    async (_how, handleSignOut) => {
      renderOpenModal(<SignOutModal onSignOut={handleSignOut} />);

      fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

      await waitFor(() => {
        expect(useToastStore.getState().toasts).toHaveLength(1);
      });
    },
  );
});

describe("<SignOutModal /> - Styles", () => {
  it("renders <SignOutModal /> as a danger question", () => {
    renderOpenModal(<SignOutModal />);
    const dialog = screen.getByRole("dialog", { name: "Sign out?" });
    const confirm = within(dialog).getByRole("button", { name: "Sign out" });

    expect(dialog).toHaveClass(
      "bg-[color-mix(in_srgb,var(--color-zl-danger)_15%,white)]",
    );
    expect(confirm).toHaveClass("bg-zl-danger-bg");
  });
});
