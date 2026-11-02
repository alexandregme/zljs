"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation.js";
import { Loader } from "../../loader";
import { ReduxProvider } from "../../redux";
import { useRouterStore } from "../../state/router";
import { Toaster } from "../../toaster";
import type { AppProvidersProps } from "./app-providers.interface";

export const AppProviders = ({ children, ...store }: AppProvidersProps) => {
  const pathname = usePathname();
  const setRoute = useRouterStore((s) => s.setRoute);

  useEffect(() => {
    if (pathname) {
      setRoute(`${pathname}${window.location.search}`);
    }
  }, [pathname, setRoute]);

  return (
    <ReduxProvider {...store}>
      <Loader />
      <Toaster />
      {children}
    </ReduxProvider>
  );
};
