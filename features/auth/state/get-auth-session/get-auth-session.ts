import { useAuthStore } from "../auth.store";
import type { AuthSession } from "../auth.interface";

/** The current session, for code outside React, such as a thunk. */
export const getAuthSession = (): AuthSession | null =>
  useAuthStore.getState().session;
