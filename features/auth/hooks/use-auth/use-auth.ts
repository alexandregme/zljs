import { useAuthStore } from "../../state";
import type { AuthAdapter } from "../../state";
import type { UseAuthResult } from "./use-auth.interface";

/** The adapter of `AuthProvider`, read when a sign-in or sign-out runs. */
const requireAdapter = (): AuthAdapter => {
  const { adapter } = useAuthStore.getState();

  if (!adapter) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }

  return adapter;
};

export const useAuth = (): UseAuthResult => {
  const status = useAuthStore((s) => s.status);
  const session = useAuthStore((s) => s.session);
  const appId = useAuthStore((s) => s.appId);
  const user = session?.user ?? null;

  return {
    status,
    user,
    role: (appId && user?.roles[appId]) ?? null,
    signInWithOAuth: (provider) => requireAdapter().signInWithOAuth(provider),
    signInWithPassword: (credentials) =>
      requireAdapter().signInWithPassword(credentials),
    signInWithMagicLink: (email) => requireAdapter().signInWithMagicLink(email),
    signOut: () => requireAdapter().signOut(),
  };
};
