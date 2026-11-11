import type { loginVendors } from "./login.const";

export type LoginVendor = keyof typeof loginVendors;

export type LoginProvider<V extends LoginVendor = LoginVendor> =
  keyof (typeof loginVendors)[V];

export interface LoginProps<V extends LoginVendor = LoginVendor> {
  /** The auth vendor behind the app's `AuthAdapter`. It sets which providers exist. */
  vendor: V;
  /** One button per provider, in this order. */
  providers: LoginProvider<V>[];
  title?: string;
  message?: string;
  /** Comes before the name of each provider, on its button. */
  providerLabel?: string;
  /** The toast when a sign-in fails. */
  errorMessage?: string;
}

export interface LoginProviderButtonProps {
  id: string;
  label: string;
  onSignIn: (id: string) => void;
}
