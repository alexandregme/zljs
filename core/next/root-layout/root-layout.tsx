import type { RootLayoutProps } from "./root-layout.interface";
import { body } from "./root-layout.styles";

export const RootLayout = ({ children }: RootLayoutProps) => {
  return <main className={body()}>{children}</main>;
};
