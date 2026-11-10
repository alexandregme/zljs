"use client";
import { useEffect } from "react";
import { useAuthStore } from "../../state";
import type { AuthProviderProps } from "./auth-provider.interface";

/**
 * Keeps the adapter, the appId and the session in `useAuthStore`, the one
 * place `useAuth` and `getAuthSession` read from. It runs in an effect, so on
 * the first render the status is still `loading`.
 */
export const AuthProvider = ({
  adapter,
  appId,
  children,
}: AuthProviderProps) => {
  const configure = useAuthStore((s) => s.configure);
  const setSession = useAuthStore((s) => s.setSession);
  const reset = useAuthStore((s) => s.reset);

  useEffect(() => {
    configure(adapter, appId);
    const unsubscribe = adapter.onSessionChange(setSession);

    return () => {
      unsubscribe();
      reset();
    };
  }, [adapter, appId, configure, setSession, reset]);

  return <>{children}</>;
};
