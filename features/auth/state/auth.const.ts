import type { AuthState } from "./auth.interface";

export const authInitialState: Pick<
  AuthState,
  "status" | "session" | "adapter" | "appId"
> = {
  status: "loading",
  session: null,
  adapter: null,
  appId: null,
};

export const authDevtools = { name: "zljs", store: "auth" };
