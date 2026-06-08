"use client";
import { useEffect } from "react";
import { useRouter } from "next/compat/router";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "../toaster";
import { Loader } from "../loader";
import { GlobalState } from "../state/global-state";
import { useRouterStore } from "../state/router";
import type { AppWrapperProps } from "./app-wrapper.interface";

export const AppWrapper = ({
  children,
  reducers,
  middlewares,
  coreReducers,
}: AppWrapperProps) => {
  const router = useRouter();
  const setRoute = useRouterStore((s) => s.setRoute);

  useEffect(() => {
    if (router?.isReady && router.asPath) {
      setRoute(router.asPath);
    }
  }, [router?.isReady, router?.asPath, setRoute]);

  return (
    <SessionProvider>
      <GlobalState
        reducers={reducers}
        middlewares={middlewares}
        coreReducers={coreReducers}
      >
        <Loader />
        <Toaster />
        {children}
      </GlobalState>
    </SessionProvider>
  );
};
