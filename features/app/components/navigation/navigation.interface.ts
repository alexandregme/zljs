import type { SidebarProps } from "../../../../core/sidebar";
import type { TopNavProps } from "../../../../core/top-nav";

/**
 * `auto` follows the width of the screen. `desktop` and `mobile` are for an
 * app made for one kind of screen only.
 */
export type NavigationMode = "auto" | "desktop" | "mobile";

/**
 * The props of `Sidebar` and of `TopNav` together: what both take is passed to
 * the one that shows, and the rest only to its owner.
 */
export interface NavigationProps
  extends SidebarProps, Pick<TopNavProps, "menuLabel" | "accountLabel"> {
  mode?: NavigationMode;
}
