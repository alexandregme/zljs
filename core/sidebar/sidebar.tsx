import { useState } from "react";
import Link from "next/link.js";
import type { SidebarProps } from "./sidebar.interface";
import { Icon } from "../icon";
import { Button } from "../button";
import { Text } from "../text";
import {
  sidebar,
  header,
  nav,
  section as sectionStyle,
  item,
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
  homeHref = "/",
  homeLabel,
  onLogout,
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const initials = getInitials(user.name);

  return (
    <aside className={sidebar({ collapsed })}>
      {homeHref && (
        <div className={header()}>
          <Link
            href={homeHref}
            className={item({ active: homeHref === activeHref, collapsed })}
            aria-label={homeLabel || "Home"}
            {...(homeHref === activeHref && { "aria-current": "page" })}
          >
            <Icon name="Home" />
            {homeLabel && (
              <Text as="span" variant="caption">
                {homeLabel}
              </Text>
            )}
          </Link>
        </div>
      )}
      <nav aria-label="Main navigation" className={nav()}>
        {sections.map((sectionData, i) => (
          <div key={i} className={sectionStyle()}>
            {sectionData.items.map((sidebarItem) => {
              const isActive = sidebarItem.href === activeHref;

              return (
                <Link
                  key={sidebarItem.href}
                  href={sidebarItem.href}
                  className={item({ active: isActive, collapsed })}
                  {...(isActive && { "aria-current": "page" })}
                >
                  <Icon name={sidebarItem.icon} />
                  <Text as="span" variant="caption">
                    {sidebarItem.label}
                  </Text>
                </Link>
              );
            })}
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
        <Button
          color="ghost"
          icon="LogOut"
          aria-label="Logout"
          onClick={onLogout}
        />
      </div>

      <div className={toggleButton()}>
        <Button
          variant="default"
          color="ghost"
          icon={collapsed ? "ChevronRight" : "ChevronLeft"}
          aria-label={collapsed ? "Expand sidebar" : undefined}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? undefined : collapseLabel}
        </Button>
      </div>
    </aside>
  );
};
