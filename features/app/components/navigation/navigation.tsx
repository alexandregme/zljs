"use client";
import { Sidebar } from "../../../../core/sidebar";
import { TopNav } from "../../../../core/top-nav";
import type { NavigationProps } from "./navigation.interface";
import { useIsDesktop } from "../../hooks";

export const Navigation = ({
  mode = "auto",
  sections,
  user,
  activeHref,
  defaultCollapsed,
  collapseLabel,
  expandLabel,
  homeHref,
  homeLabel,
  navLabel,
  menuLabel,
  accountLabel,
  logout,
  onLogout,
}: NavigationProps) => {
  const fitsSidebar = useIsDesktop();
  const desktop = mode === "auto" ? fitsSidebar : mode === "desktop";

  // On the server the width is unknown. Nothing is better than the wrong one,
  // which would show and then swap.
  if (desktop === null) {
    return null;
  }

  if (desktop) {
    return (
      <Sidebar
        sections={sections}
        user={user}
        activeHref={activeHref}
        defaultCollapsed={defaultCollapsed}
        collapseLabel={collapseLabel}
        expandLabel={expandLabel}
        homeHref={homeHref}
        homeLabel={homeLabel}
        navLabel={navLabel}
        logout={logout}
        onLogout={onLogout}
      />
    );
  }

  return (
    <TopNav
      sections={sections}
      user={user}
      activeHref={activeHref}
      homeHref={homeHref}
      homeLabel={homeLabel}
      navLabel={navLabel}
      menuLabel={menuLabel}
      accountLabel={accountLabel}
      logout={logout}
      onLogout={onLogout}
    />
  );
};
