import { useState } from "react";
import { SignOutButton } from "../../features/auth/components/sign-out";
import { Button } from "../button";
import { Icon } from "../icon";
import { Link } from "../next/link";
import { Text } from "../text";
import type { TopNavProps } from "./top-nav.interface";
import { topNav } from "./top-nav.styles";

type Panel = "menu" | "account" | null;

export const TopNav = ({
  sections,
  user,
  activeHref,
  homeHref = "/",
  homeLabel,
  navLabel = "Main navigation",
  menuLabel = "Menu",
  accountLabel = "Account",
  logout = {},
  onLogout,
}: TopNavProps) => {
  // One panel at a time: opening one closes the other.
  const [open, setOpen] = useState<Panel>(null);
  const styles = topNav();

  const menuOpen = open === "menu";
  const accountOpen = open === "account";
  const menuIcon = menuOpen ? "X" : "Menu";

  const toggleMenu = (): void => {
    setOpen(menuOpen ? null : "menu");
  };

  const toggleAccount = (): void => {
    setOpen(accountOpen ? null : "account");
  };

  const close = (): void => {
    setOpen(null);
  };

  return (
    <header className={styles.base()}>
      <div className={styles.bar()}>
        <Button
          color="ghost"
          size="lg"
          icon={menuIcon}
          aria-label={menuLabel}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        />
        <div className={styles.home()}>
          {homeHref && (
            <Link
              href={homeHref}
              variant="nav"
              color="none"
              active={homeHref === activeHref}
              aria-label={homeLabel || "Home"}
              onClick={close}
            >
              <Icon name="Home" />
              {homeLabel && (
                <Text as="span" variant="caption">
                  {homeLabel}
                </Text>
              )}
            </Link>
          )}
        </div>
        <Button
          color="ghost"
          size="lg"
          icon="User"
          aria-label={accountLabel}
          aria-expanded={accountOpen}
          onClick={toggleAccount}
        />
      </div>

      {accountOpen && (
        <div className={styles.account()}>
          <div className={styles.user()}>
            <Text as="span" variant="caption">
              {user.name}
            </Text>
            <Text as="span" variant="caption">
              {user.email}
            </Text>
          </div>
          <SignOutButton
            size="lg"
            label={logout.label}
            confirmTitle={logout.confirmTitle}
            confirmLabel={logout.confirmLabel}
            cancelLabel={logout.cancelLabel}
            errorMessage={logout.errorMessage}
            onSignOut={onLogout}
          />
        </div>
      )}

      {menuOpen && (
        <nav aria-label={navLabel} className={styles.menu()}>
          {sections.map((section, i) => (
            <div key={i} className={styles.section()}>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  variant="nav"
                  color="none"
                  active={item.href === activeHref}
                  aria-label={item.label}
                  onClick={close}
                >
                  <Icon name={item.icon} />
                  <Text as="span" variant="caption">
                    {item.label}
                  </Text>
                </Link>
              ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
};
