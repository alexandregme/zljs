import type { ShareAppButtonProps } from "../../features/app/components/share-app-button";
import type { SignOutButtonProps } from "../../features/auth/components/sign-out";
import type { IconName } from "../icon/icon.interface";

export interface SidebarItem {
  icon: IconName;
  label: string;
  href: string;
}

export interface SidebarSection {
  items: SidebarItem[];
}

export interface SidebarUser {
  name: string;
  email: string;
}

export interface SidebarProps {
  sections: SidebarSection[];
  user: SidebarUser;
  activeHref?: string;
  defaultCollapsed?: boolean;
  collapseLabel: string;
  /** The accessible name of the collapse button while collapsed. */
  expandLabel?: string;
  homeHref?: string | false;
  homeLabel?: string;
  /** The accessible name of the navigation. */
  navLabel?: string;
  /**
   * The share button, over the user: its texts (`label`, `copiedMessage` and
   * `errorMessage`) and what goes with the address of the app (`title` and
   * `text`).
   */
  share?: Omit<ShareAppButtonProps, "showLabel" | "size">;
  /**
   * The texts of the logout button and of the modal it opens: `label`,
   * `confirmTitle`, `confirmLabel`, `cancelLabel` and `errorMessage`.
   */
  logout?: Omit<SignOutButtonProps, "onSignOut">;
  /**
   * Logs the user out. It is called when the user confirms in the modal, never
   * on the first click. A rejected promise shows the error toast.
   */
  onLogout: () => void | Promise<void>;
}
