import { Analytics } from "@vercel/analytics/next";
import type { RootLayoutProps } from "./root-layout.interface";
import { rootLayout } from "./root-layout.styles";

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <main className={rootLayout()}>{children}</main>
      {/* Outside production the script logs every page view to the console.
          `debug={false}` keeps the console of the app, and of its tests,
          clean. It changes nothing in production. */}
      <Analytics debug={false} />
    </>
  );
};
