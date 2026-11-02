import type { ReactNode } from "react";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime.js";

export interface MockRouteProviderProps {
  children: ReactNode;
  pathname: string;
}

/**
 * Gives `usePathname` a route with the context Next.js itself reads, so a test
 * or story doesn't mock `next/navigation`.
 */
export const MockRouteProvider = ({
  children,
  pathname,
}: MockRouteProviderProps) => (
  <PathnameContext.Provider value={pathname}>
    {children}
  </PathnameContext.Provider>
);
