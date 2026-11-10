import type { ReactNode } from "react";
import type { AuthConfig } from "../../../auth";

export interface ZustandProvidersProps {
  children: ReactNode;
  /** Turns on `AuthProvider`. Without it, nothing of auth is mounted. */
  auth?: AuthConfig;
}
