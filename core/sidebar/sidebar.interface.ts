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
  onLogout: () => void;
}
