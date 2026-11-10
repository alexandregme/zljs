import { useState, type ReactNode } from "react";
import { AuthProvider } from "@zljs/core";
import type { AuthAdapter, AuthSession } from "@zljs/core";

export const MOCK_APP_ID = "entregas";

export const MOCK_AUTH_SESSION: AuthSession = {
  accessToken: "mock-access-token",
  user: {
    id: "user-1",
    email: "ana@zljs.dev",
    name: "Ana",
    hasAccess: true,
    roles: { [MOCK_APP_ID]: "admin" },
  },
};

/**
 * An adapter that keeps the session in memory: every sign-in signs in as
 * `MOCK_AUTH_SESSION`, and the magic link only resolves, as it only sends an
 * email. A new one per call, so a test or story shares nothing with the others.
 */
export const createMockAuthAdapter = (
  initialSession: AuthSession | null = null,
): AuthAdapter => {
  let session = initialSession;
  const listeners = new Set<(session: AuthSession | null) => void>();

  const setSession = (next: AuthSession | null) => {
    session = next;
    listeners.forEach((listener) => listener(next));
  };

  return {
    onSessionChange: (listener) => {
      listeners.add(listener);
      listener(session);
      return () => {
        listeners.delete(listener);
      };
    },
    signInWithOAuth: async () => setSession(MOCK_AUTH_SESSION),
    signInWithPassword: async () => setSession(MOCK_AUTH_SESSION),
    signInWithMagicLink: async () => {},
    signOut: async () => setSession(null),
  };
};

export interface MockAuthProviderProps {
  children: ReactNode;
  session?: AuthSession | null;
}

export const MockAuthProvider = ({
  children,
  session = null,
}: MockAuthProviderProps) => {
  const [adapter] = useState(() => createMockAuthAdapter(session));

  return (
    <AuthProvider adapter={adapter} appId={MOCK_APP_ID}>
      {children}
    </AuthProvider>
  );
};
