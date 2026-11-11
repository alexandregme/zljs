import type { ReactNode } from "react";
import type { AccessPendingProps } from "../access-pending";
import type { LoginProps, LoginVendor } from "../login";

export interface AuthorizedProps<V extends LoginVendor = LoginVendor> {
  /** The app, shown only to a signed-in user with access to it. */
  children: ReactNode;
  /**
   * Roles that may see `children`, on top of access. Without it, access is
   * enough, with or without a role.
   */
  roles?: string[];
  /** The props of the `Login` a signed-out user sees. */
  login: LoginProps<V>;
  /** The props of the `AccessPending` a user who can't see `children` sees. */
  accessPending?: AccessPendingProps;
}
