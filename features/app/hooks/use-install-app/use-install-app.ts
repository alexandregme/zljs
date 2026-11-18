import { useEffect, useState, useSyncExternalStore } from "react";
import {
  INSTALL_APP_IOS_USER_AGENT,
  INSTALLED_APP_QUERY,
} from "./use-install-app.const";
import type {
  InstallApp,
  InstallPromptEvent,
} from "./use-install-app.interface";

// The browser and how the page was opened don't change while the page is open.
const subscribeToNothing = (): (() => void) => () => {};

// An iPhone has no install dialog: the user adds the page from the share menu.
// Opened from the home screen, the app is already installed.
const needsInstructions = (): boolean =>
  INSTALL_APP_IOS_USER_AGENT.test(navigator.userAgent) &&
  !window.matchMedia(INSTALLED_APP_QUERY).matches;

// The server doesn't know the browser.
const notOnServer = (): boolean => false;

/**
 * How the browser can put the app on the home screen of the device, to open
 * like an installed app. It listens for the install offer of the browser from
 * the moment it mounts, so call it in a component that stays on the page.
 */
export const useInstallApp = (): InstallApp => {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(
    null,
  );
  const instructions = useSyncExternalStore(
    subscribeToNothing,
    needsInstructions,
    notOnServer,
  );

  useEffect(() => {
    // Kept for a click: the browser only lets a click of the user show it.
    // `preventDefault` stops the banner some browsers show on their own.
    const keep = (event: Event): void => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    };

    const forget = (): void => {
      setPromptEvent(null);
    };

    window.addEventListener("beforeinstallprompt", keep);
    window.addEventListener("appinstalled", forget);

    return () => {
      window.removeEventListener("beforeinstallprompt", keep);
      window.removeEventListener("appinstalled", forget);
    };
  }, []);

  const prompt = (): void => {
    if (!promptEvent) {
      return;
    }

    // An event shows its dialog once. The browser sends another one if the
    // user says no and the app can still be installed.
    void promptEvent.prompt();
    setPromptEvent(null);
  };

  if (promptEvent) {
    return { way: "prompt", prompt };
  }

  return { way: instructions ? "instructions" : null, prompt };
};
