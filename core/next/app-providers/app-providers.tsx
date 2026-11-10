"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation.js";
import { ZustandProviders } from "../../../features/providers";
import { ReduxProvider } from "../../state/redux";
import { useRouterStore } from "../../state/zustand/router";
import type { AppProvidersProps } from "./app-providers.interface";

const RouteSync = () => {
  const pathname = usePathname();
  const setRoute = useRouterStore((s) => s.setRoute);

  useEffect(() => {
    if (pathname) {
      setRoute(`${pathname}${window.location.search}`);
    }
  }, [pathname, setRoute]);

  return null;
};

export const AppProviders = ({ children, ...store }: AppProvidersProps) => (
  <ReduxProvider {...store}>
    <RouteSync />
    <ZustandProviders>{children}</ZustandProviders>
  </ReduxProvider>
);
