import { Loader } from "../../../app";
import { Toaster } from "../../../toaster";
import { AuthProvider } from "../../../auth";
import type { ZustandProvidersProps } from "./zustand-providers.interface";

export const ZustandProviders = ({ children, auth }: ZustandProvidersProps) => (
  <>
    <Loader />
    <Toaster />
    {auth ? (
      <AuthProvider adapter={auth.adapter} appId={auth.appId}>
        {children}
      </AuthProvider>
    ) : (
      children
    )}
  </>
);
