import type { SignOutButtonProps } from "../../features/auth/components/sign-out";
import type { SidebarSection, SidebarUser } from "../sidebar";

export interface TopNavProps {
  /**
   * The same sections `Sidebar` takes. The menu button opens them. With no
   * link in any section, the menu button isn't shown.
   */
  sections: SidebarSection[];
  /** The same user `Sidebar` takes. The account button shows it. */
  user: SidebarUser;
  activeHref?: string;
  homeHref?: string | false;
  homeLabel?: string;
  /** The accessible name of the navigation the menu button opens. */
  navLabel?: string;
  /** The accessible name of the menu button. */
  menuLabel?: string;
  /** The accessible name of the account button. */
  accountLabel?: string;
  /**
   * The texts of the logout button and of the modal it opens: `label`,
   * `confirmTitle`, `confirmLabel`, `cancelLabel` and `errorMessage`.
   */
  logout?: Omit<SignOutButtonProps, "onSignOut" | "size">;
  /**
   * Logs the user out. It is called when the user confirms in the modal, never
   * on the first tap. A rejected promise shows the error toast.
   */
  onLogout: () => void | Promise<void>;
}
