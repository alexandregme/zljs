import type { ReactNode } from "react";
import type { AuthConfig } from "../../state";

export interface AuthProviderProps extends AuthConfig {
  children: ReactNode;
}
