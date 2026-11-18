import { act, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import {
  ANDROID_USER_AGENT,
  IPHONE_USER_AGENT,
  offerInstall,
  restoreBrowserStubs,
  stubMatchMedia,
  stubUserAgent,
} from "@test-utils";
import { useInstallApp } from "@zljs/core";

const INSTALLED = true;
const IN_THE_BROWSER = false;

const Probe = () => <p>{String(useInstallApp().way)}</p>;

afterEach(() => {
  restoreBrowserStubs();
});

describe("useInstallApp", () => {
  it("has no way to install in a browser that offers none", () => {
    const { result } = renderHook(() => useInstallApp());

    expect(result.current.way).toBeNull();
    expect(() => result.current.prompt()).not.toThrow();
  });

  it("installs by prompt once the browser offers the install", () => {
    stubUserAgent(ANDROID_USER_AGENT);
    const { result } = renderHook(() => useInstallApp());
    const offer = new Event("beforeinstallprompt", { cancelable: true });

    act(() => {
      window.dispatchEvent(Object.assign(offer, { prompt: () => {} }));
    });

    expect(result.current.way).toBe("prompt");
    expect(offer.defaultPrevented).toBe(true);
  });

  it("shows the dialog of the browser once on prompt", () => {
    const { result } = renderHook(() => useInstallApp());
    let prompt = vi.fn();

    act(() => {
      prompt = offerInstall();
    });
    act(() => {
      result.current.prompt();
    });

    expect(prompt).toHaveBeenCalledTimes(1);
    expect(result.current.way).toBeNull();

    act(() => {
      result.current.prompt();
    });

    expect(prompt).toHaveBeenCalledTimes(1);
  });

  it("has no way to install after the app is installed", () => {
    const { result } = renderHook(() => useInstallApp());

    act(() => {
      offerInstall();
    });
    act(() => {
      window.dispatchEvent(new Event("appinstalled"));
    });

    expect(result.current.way).toBeNull();
  });

  it("installs by instructions on an iPhone", () => {
    stubUserAgent(IPHONE_USER_AGENT);
    const matchMedia = vi.fn((media: string) => ({ media, matches: false }));
    vi.stubGlobal("matchMedia", matchMedia);

    const { result } = renderHook(() => useInstallApp());

    expect(result.current.way).toBe("instructions");
    expect(matchMedia).toHaveBeenCalledWith("(display-mode: standalone)");
  });

  it("has no way to install on an iPhone that opened the installed app", () => {
    stubUserAgent(IPHONE_USER_AGENT);
    stubMatchMedia(INSTALLED);

    const { result } = renderHook(() => useInstallApp());

    expect(result.current.way).toBeNull();
  });

  it("stops listening to the browser when the component leaves", () => {
    stubUserAgent(IPHONE_USER_AGENT);
    stubMatchMedia(IN_THE_BROWSER);
    const removeEventListener = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useInstallApp());

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "beforeinstallprompt",
      expect.any(Function),
    );
    expect(removeEventListener).toHaveBeenCalledWith(
      "appinstalled",
      expect.any(Function),
    );
  });

  it("has no way to install on the server, where there is no browser", () => {
    expect(renderToString(<Probe />)).toContain("null");
  });
});
