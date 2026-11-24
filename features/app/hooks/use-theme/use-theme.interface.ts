import type { themes } from "./use-theme.const";

/**
 * `system` follows the theme of the device, and changes with it. `light` and
 * `dark` are the choice of the user, whatever the device says.
 */
export type Theme = (typeof themes)[number];

export interface UseTheme {
  /** The theme the user chose. `system` while they chose none. */
  theme: Theme;
  /**
   * Changes the theme of the page, and keeps the choice in the browser for the
   * next visit.
   */
  setTheme: (theme: Theme) => void;
}
