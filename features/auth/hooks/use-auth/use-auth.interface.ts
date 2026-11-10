import type { AuthAdapter, AuthStatus, AuthUser } from "../../state";

export interface UseAuthResult extends Omit<AuthAdapter, "onSessionChange"> {
  status: AuthStatus;
  user: AuthUser | null;
  /** The user's role in this app, or `null` when they have none. */
  role: string | null;
}
