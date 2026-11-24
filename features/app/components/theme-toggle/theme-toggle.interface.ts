import type { Size } from "../../../../core/types";

export interface ThemeToggleProps {
  /**
   * The accessible name of the group of buttons. With `iconOnly`, it starts
   * the name of the one button, before the theme in use.
   */
  label: string;
  /**
   * Shows one button, with the icon of the theme in use, that goes to the next
   * theme on each click. For a place with no room for the three, such as a
   * collapsed sidebar.
   */
  iconOnly?: boolean;
  /** The size of the buttons. `lg` is for a touch screen. */
  size?: Size;
  /** The name of the theme that follows the device. */
  systemLabel?: string;
  /** The name of the light theme. */
  lightLabel?: string;
  /** The name of the dark theme. */
  darkLabel?: string;
}
