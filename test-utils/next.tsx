import type { ReactNode } from "react";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime.js";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime.js";
import type { NextRouter } from "next/router.js";

export interface MockRouteProviderProps {
  children: ReactNode;
  pathname?: string;
}

const navigated = (): Promise<boolean> => Promise.resolve(true);
const prefetched = (): Promise<void> => Promise.resolve();

/**
 * Gives `usePathname` a route and `next/link` a router, with the contexts
 * Next.js itself reads, so a test or story doesn't mock `next/navigation`.
 *
 * The router goes nowhere. Without one, a click on a link falls back to the
 * browser's navigation, which jsdom doesn't have: it prints `Not implemented:
 * navigation to another Document` in the test output.
 */
export const MockRouteProvider = ({
  children,
  pathname = "/",
}: MockRouteProviderProps) => {
  const router = {
    pathname,
    asPath: pathname,
    query: {},
    push: navigated,
    replace: navigated,
    prefetch: prefetched,
  } as unknown as NextRouter;

  return (
    <RouterContext.Provider value={router}>
      <PathnameContext.Provider value={pathname}>
        {children}
      </PathnameContext.Provider>
    </RouterContext.Provider>
  );
};
