import { useState } from "react";
import Link from "next/link";
import type { SidebarProps } from "./sidebar.interface";
import { Icon } from "../icon";
import { Button } from "../button";
import {
  sidebar,
  header,
  nav,
  section as sectionStyle,
  item,
  itemIcon,
  itemLabel,
  footer,
  avatar,
  userInfo,
  userName,
  userEmail,
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
        <Link
          href={homeHref}
          className={header()}
          aria-label={homeLabel || "Home"}
        >
          <span className={item({ active: homeHref === activeHref })}>
            <span className={itemIcon()}>
              <Icon name="Home" />
            </span>
            <span className={itemLabel({ collapsed })}>{homeLabel}</span>
          </span>
        </Link>
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
                  className={item({ active: isActive })}
                  {...(isActive && { "aria-current": "page" })}
                >
                  <span className={itemIcon()}>
                    <Icon name={sidebarItem.icon} />
                  </span>
                  <span className={itemLabel({ collapsed })}>
                    {sidebarItem.label}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className={footer()}>
        <div className={avatar()}>{initials}</div>
        <div className={userInfo()}>
          <span className={userName()}>{user.name}</span>
          <span className={userEmail()}>{user.email}</span>
        </div>
        <Button
          variant="ghost"
          icon="LogOut"
          aria-label="Logout"
          onClick={onLogout}
        />
      </div>

      <div className={toggleButton()}>
        <Button
          variant="ghost"
          icon={collapsed ? "ChevronRight" : "ChevronLeft"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapseLabel}
        </Button>
      </div>
    </aside>
  );
};
