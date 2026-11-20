import type { Size } from "../../../../core/types";

export interface ShareAppButtonProps {
  /** The text of the button. With `iconOnly`, its accessible name. */
  label: string;
  /**
   * Shows the icon alone, for a place with no room for the text, such as a
   * collapsed sidebar.
   */
  iconOnly?: boolean;
  /** The size of the button. `lg` is for a touch screen. */
  size?: Size;
  /**
   * The title of what is shared. By default the title of the page. The address
   * is always the origin of the page: where the app starts, whatever page the
   * user is on.
   */
  title?: string;
  /** A text that goes with the address, such as how to ask for access. */
  text?: string;
  /** The toast shown when the address is copied instead of shared. */
  copiedMessage?: string;
  /** The toast shown when the address could be neither shared nor copied. */
  errorMessage?: string;
}
