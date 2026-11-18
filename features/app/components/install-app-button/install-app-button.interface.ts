import type { Size } from "../../../../core/types";
import type { InstallAppWay } from "../../hooks";

export interface InstallAppButtonProps {
  /**
   * How the browser installs the app, from `useInstallApp`: `prompt` calls
   * `onPrompt` on a click, and `instructions` opens a modal with the steps.
   */
  way: InstallAppWay;
  /** The accessible name of the icon button. */
  label?: string;
  /** The size of the icon button. `lg` is for a touch screen. */
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
