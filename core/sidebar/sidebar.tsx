import { useState } from "react";
import type { SidebarProps } from "./sidebar.interface";
import { SignOutButton } from "../../features/auth/components/sign-out";
import { Icon } from "../icon";
import { Button } from "../button";
import { Text } from "../text";
import { Link } from "../next/link";
import {
  sidebar,
  header,
  nav,
  section as sectionStyle,
  footer,
  avatar,
  userInfo,
  toggleButton,
} from "./sidebar.styles";

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
  }
  return (parts[0]?.[0] ?? "").toUpperCase();
};

export const Sidebar = ({
  sections,
  user,
  activeHref,
  defaultCollapsed = false,
  collapseLabel,
  expandLabel = "Expand sidebar",
  homeHref = "/",
  homeLabel,
  navLabel = "Main navigation",
  logout = {},
  onLogout,
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const initials = getInitials(user.name);
  const toggleLabel = collapsed ? expandLabel : collapseLabel;
  const toggleIcon = collapsed ? "ChevronRight" : "ChevronLeft";

  const toggle = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={sidebar({ collapsed })}>
      {homeHref && (
        <div className={header()}>
          <Link
            href={homeHref}
            variant="nav"
            color="none"
            active={homeHref === activeHref}
            aria-label={homeLabel || "Home"}
          >
            <Icon name="Home" />
            {homeLabel && !collapsed && (
              <Text as="span" variant="caption">
                {homeLabel}
              </Text>
            )}
          </Link>
        </div>
      )}
      <nav aria-label={navLabel} className={nav()}>
        {sections.map((sectionData, i) => (
          <div key={i} className={sectionStyle()}>
            {sectionData.items.map((sidebarItem) => (
              <Link
                key={sidebarItem.href}
                href={sidebarItem.href}
                variant="nav"
                color="none"
                active={sidebarItem.href === activeHref}
                aria-label={sidebarItem.label}
              >
                <Icon name={sidebarItem.icon} />
                {!collapsed && (
                  <Text as="span" variant="caption">
                    {sidebarItem.label}
                  </Text>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className={footer({ collapsed })}>
        {!collapsed && (
          <>
            <div aria-hidden="true" className={avatar()}>
              {initials}
            </div>
            <div className={userInfo()}>
              <Text as="span" variant="caption">
                {user.name}
              </Text>
              <Text as="span" variant="caption">
                {user.email}
              </Text>
            </div>
          </>
        )}
        <SignOutButton
          label={logout.label}
          confirmTitle={logout.confirmTitle}
          confirmLabel={logout.confirmLabel}
          cancelLabel={logout.cancelLabel}
          errorMessage={logout.errorMessage}
          onSignOut={onLogout}
        />
      </div>

      <div className={toggleButton()}>
        <Button
          color="ghost"
          icon={toggleIcon}
          aria-label={toggleLabel}
          onClick={toggle}
        >
          {!collapsed && collapseLabel}
        </Button>
      </div>
    </aside>
  );
};
