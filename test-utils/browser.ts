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

export const restoreBrowserStubs = () => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
};
