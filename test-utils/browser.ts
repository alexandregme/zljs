export const DESKTOP_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)";
export const IPHONE_USER_AGENT =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)";
export const ANDROID_USER_AGENT = "Mozilla/5.0 (Android 14; Mobile)";

export const stubUserAgent = (userAgent: string) =>
  vi.spyOn(navigator, "userAgent", "get").mockReturnValue(userAgent);

export const stubWindowOpen = () =>
  vi.spyOn(window, "open").mockImplementation(() => null);

export const stubLocation = (location: Partial<Location>) =>
  vi.stubGlobal("location", location);

// jsdom has no layout, so every element measures 0. AG Grid reads that as an
// element that left the DOM, and closes the popup anchored to it.
export const stubElementRect = () =>
  vi
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockReturnValue(new DOMRect(0, 0, 100, 40));

// jsdom has no `matchMedia`. Every query answers `matches`, and `change` of
// the result flips the answer and tells the listeners, as a resized window does.
export const stubMatchMedia = (matches: boolean) => {
  const listeners = new Set<() => void>();
  let current = matches;

  vi.stubGlobal("matchMedia", (media: string) => ({
    media,
    get matches() {
      return current;
    },
    addEventListener: (_type: string, listener: () => void) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: string, listener: () => void) => {
      listeners.delete(listener);
    },
  }));

  return {
    change: (next: boolean) => {
      current = next;
      listeners.forEach((listener) => listener());
    },
    listeners,
  };
};

// jsdom never offers to install the app. This sends the offer a browser sends
// when the app can be installed, and returns the `prompt` that would show its
// dialog. It changes the state of who listens, so call it inside `act`.
export const offerInstall = () => {
  const prompt = vi.fn(() => Promise.resolve());

  window.dispatchEvent(
    Object.assign(new Event("beforeinstallprompt", { cancelable: true }), {
      prompt,
    }),
  );

  return prompt;
};

// jsdom has no `navigator.clipboard`. This gives it one whose `writeText`
// resolves, or rejects as a browser does without permission, and returns it.
export const stubClipboard = (result: "resolve" | "reject" = "resolve") => {
  const writeText = vi.fn(() =>
    result === "resolve" ? Promise.resolve() : Promise.reject(new Error()),
  );

  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });

  return writeText;
};

export const restoreBrowserStubs = () => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  // Only the own property that stubClipboard adds; a browser's lives on the prototype.
  Reflect.deleteProperty(navigator, "clipboard");
};
