import type { ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { createMockAuthAdapter, MOCK_APP_ID } from "@test-utils";
import { AuthProvider, useAuth } from "@zljs/core";

const CREDENTIALS = { email: "ana@zljs.dev", password: "secret" };

describe("useAuth", () => {
  it("is loading with no user outside <AuthProvider />", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.status).toBe("loading");
    expect(result.current.user).toBeNull();
    expect(result.current.role).toBeNull();
  });

  it("throws on a sign-in or sign-out outside <AuthProvider />", () => {
    const { result } = renderHook(() => useAuth());
    const message = "useAuth must be used inside <AuthProvider>";

    expect(() => result.current.signInWithOAuth("google")).toThrow(message);
    expect(() => result.current.signInWithPassword(CREDENTIALS)).toThrow(
      message,
    );
    expect(() => result.current.signInWithMagicLink(CREDENTIALS.email)).toThrow(
      message,
    );
    expect(() => result.current.signOut()).toThrow(message);
  });

  it("calls the sign-in and sign-out of the adapter", async () => {
    const adapter = createMockAuthAdapter();
    const signInWithOAuth = vi.spyOn(adapter, "signInWithOAuth");
    const signInWithPassword = vi.spyOn(adapter, "signInWithPassword");
    const signInWithMagicLink = vi.spyOn(adapter, "signInWithMagicLink");
    const signOut = vi.spyOn(adapter, "signOut");
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider adapter={adapter} appId={MOCK_APP_ID}>
        {children}
      </AuthProvider>
    );
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signInWithOAuth("google");
      await result.current.signInWithPassword(CREDENTIALS);
      await result.current.signInWithMagicLink(CREDENTIALS.email);
      await result.current.signOut();
    });

    expect(signInWithOAuth).toHaveBeenCalledWith("google");
    expect(signInWithPassword).toHaveBeenCalledWith(CREDENTIALS);
    expect(signInWithMagicLink).toHaveBeenCalledWith(CREDENTIALS.email);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
