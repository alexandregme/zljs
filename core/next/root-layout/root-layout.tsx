import type { RootLayoutProps } from "./root-layout.interface";
import { rootLayout } from "./root-layout.styles";

export const RootLayout = ({ children }: RootLayoutProps) => {
  return <main className={rootLayout()}>{children}</main>;
};
