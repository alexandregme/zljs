import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { authDevtools, authInitialState } from "./auth.const";
import type { AuthState } from "./auth.interface";

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      ...authInitialState,
      setSession: (session) =>
        set(
          {
            session,
            status: session ? "authenticated" : "unauthenticated",
          },
          false,
          "setSession",
        ),
      configure: (adapter, appId) =>
        set({ adapter, appId }, false, "configure"),
      reset: () => set(authInitialState, false, "reset"),
    }),
    authDevtools,
  ),
);
