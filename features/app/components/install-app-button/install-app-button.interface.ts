import type { Size } from "../../../../core/types";
import type { InstallAppWay } from "../../hooks";

export interface InstallAppButtonProps {
  /**
   * How the browser installs the app, from `useInstallApp`: `prompt` calls
   * `onPrompt` on a click, and `instructions` opens a modal with the steps.
   */
  way: InstallAppWay;
  /** The text of the button. While `showLabel` is off, its accessible name. */
  label?: string;
  /** Shows `label` beside the icon, for a button that is a row of a menu. */
  showLabel?: boolean;
  /** The size of the button. `lg` is for a touch screen. */
  size?: Size;
  /** The title of the modal with the steps. */
  instructionsTitle?: string;
  /** The steps to install the app by hand, the text of the modal. */
  instructions?: string;
  /**
   * Shows the install dialog of the browser: the `prompt` of `useInstallApp`.
   * It is called on a click when `way` is `prompt`.
   */
  onPrompt: () => void;
}
