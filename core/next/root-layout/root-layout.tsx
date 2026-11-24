import { Analytics } from "@vercel/analytics/next";
import { themeScript } from "../../../features/app/hooks/use-theme";
import type { RootLayoutProps } from "./root-layout.interface";
import { rootLayout } from "./root-layout.styles";

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      {/* Before the page: it applies the theme the user chose, so the page is
          never drawn in the wrong one. */}
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <main className={rootLayout()}>{children}</main>
      {/* Outside production the script logs every page view to the console.
          `debug={false}` keeps the console of the app, and of its tests,
          clean. It changes nothing in production. */}
      <Analytics debug={false} />
    </>
  );
};
