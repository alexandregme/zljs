import { vi } from "vitest";

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

export const restoreBrowserStubs = () => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
};
