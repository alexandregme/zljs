import { useSyncExternalStore } from "react";
import {
  THEME_RULES,
  THEME_STORAGE_KEY,
  THEME_STYLE_ID,
  themes,
} from "./use-theme.const";
import type { Theme, UseTheme } from "./use-theme.interface";

const SYSTEM: Theme = "system";

// Who shows the theme on this page. Another tab tells through `storage`.
const listeners = new Set<() => void>();

const isTheme = (value: unknown): value is Theme =>
  themes.includes(value as Theme);

// The browser is where the choice lives, so every tab and every visit agree.
const readTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    return isTheme(stored) ? stored : SYSTEM;
  } catch {
    // A browser that blocks the storage: the theme of the system.
    return SYSTEM;
  }
};

const storeTheme = (theme: Theme): void => {
  try {
    if (theme === SYSTEM) {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch {
    // A browser that blocks the storage: the choice lasts while the page does.
  }
};

// One `<style>` holds the choice. Empty, the page follows the system.
const applyTheme = (theme: Theme): void => {
  const existing = document.getElementById(THEME_STYLE_ID);
  const style = existing ?? document.createElement("style");

  style.id = THEME_STYLE_ID;
  style.textContent = theme === SYSTEM ? "" : THEME_RULES[theme];

  if (!existing) {
    document.head.append(style);
  }
};

/**
 * Changes the theme of the page from outside a component, and keeps the choice
 * in the browser for the next visit. Inside a component, use `useTheme`.
 */
export const setTheme = (theme: Theme): void => {
  storeTheme(theme);
  applyTheme(theme);
  listeners.forEach((listener) => listener());
};

const subscribe = (onChange: () => void): (() => void) => {
  // The choice made in another tab reaches this one.
  const followOtherTab = (event: StorageEvent): void => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      applyTheme(readTheme());
      onChange();
    }
  };

  // A page with no `RootLayout` has no script that applies the stored choice.
  applyTheme(readTheme());
  listeners.add(onChange);
  window.addEventListener("storage", followOtherTab);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", followOtherTab);
  };
};

// The server doesn't know the choice: it is in the browser.
const unknown = (): Theme => SYSTEM;

/**
 * The theme the user chose and the function that changes it. `system`, the
 * default, follows the device. On the server the theme is `system`, where the
 * choice can't be read.
 */
export const useTheme = (): UseTheme => {
  const theme = useSyncExternalStore(subscribe, readTheme, unknown);

  return { theme, setTheme };
};
