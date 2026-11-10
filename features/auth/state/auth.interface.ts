export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  /**
   * Whether the user may use this app, such as approved by an admin. It is
   * separate from the role: a user can have access and no role.
   */
  hasAccess: boolean;
  /** The user's role in each app, by app id: `{ entregas: "admin" }`. */
  roles: Record<string, string>;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

/**
 * What an auth provider must do for zljs. Each sign-in rejects
 * on failure, so the caller can show the error.
 */
export interface AuthAdapter {
  /**
   * Calls `listener` right away with the current session, then on every
   * change (sign in, sign out, token refresh). Returns the unsubscribe.
   */
  onSessionChange: (
    listener: (session: AuthSession | null) => void,
  ) => () => void;
  signInWithOAuth: (provider: string) => Promise<void>;
  signInWithPassword: (credentials: AuthCredentials) => Promise<void>;
  /** Sends a sign-in link by email. The session comes when the link is opened. */
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

/** What an app gives zljs to turn auth on. */
export interface AuthConfig {
  /** Connects zljs to the app's auth provider. */
  adapter: AuthAdapter;
  /** The key of this app in each user's `roles`. */
  appId: string;
}

export interface AuthState {
  status: AuthStatus;
  session: AuthSession | null;
  /** The adapter of `AuthProvider`, or `null` outside it. */
  adapter: AuthAdapter | null;
  /** The key of this app in each user's `roles`, or `null` outside `AuthProvider`. */
  appId: string | null;
  setSession: (session: AuthSession | null) => void;
  configure: (adapter: AuthAdapter, appId: string) => void;
  reset: () => void;
}
