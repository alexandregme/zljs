import { useSyncExternalStore } from "react";
import { DESKTOP_QUERY } from "./use-is-desktop.const";

const subscribe = (onChange: () => void): (() => void) => {
  const media = window.matchMedia(DESKTOP_QUERY);

  media.addEventListener("change", onChange);

  return () => {
    media.removeEventListener("change", onChange);
  };
};

const isDesktop = (): boolean => window.matchMedia(DESKTOP_QUERY).matches;

// The server doesn't know the width of the screen.
const unknown = (): null => null;

/**
 * Whether the screen fits `Sidebar`, and it follows the screen as it is
 * resized or turned. `null` on the server, where there is no screen.
 */
export const useIsDesktop = (): boolean | null =>
  useSyncExternalStore(subscribe, isDesktop, unknown);
