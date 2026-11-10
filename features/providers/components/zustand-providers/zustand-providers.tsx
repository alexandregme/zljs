import { Loader } from "../../../app";
import { Toaster } from "../../../toaster";
import type { ZustandProvidersProps } from "./zustand-providers.interface";

export const ZustandProviders = ({ children }: ZustandProvidersProps) => (
  <>
    <Loader />
    <Toaster />
    {children}
  </>
);
