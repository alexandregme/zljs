/**
 * How the browser puts the app on the home screen: `prompt` shows its own
 * install dialog, and `instructions` is for a browser with no dialog to show,
 * where the user is told the steps.
 */
export type InstallAppWay = "prompt" | "instructions";

export interface InstallApp {
  /**
   * How this browser installs the app. `null` when it can't, when the app is
   * already installed, and on the server.
   */
  way: InstallAppWay | null;
  /**
   * Shows the install dialog of the browser. Call it from a click. It does
   * nothing unless `way` is `prompt`.
   */
  prompt: () => void;
}

/** The event a browser sends when the app can be installed. It is not in the DOM types yet. */
export interface InstallPromptEvent extends Event {
  prompt: () => Promise<unknown>;
}
