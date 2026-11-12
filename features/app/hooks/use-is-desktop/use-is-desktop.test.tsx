import { act, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { restoreBrowserStubs, stubMatchMedia } from "@test-utils";
import { useIsDesktop } from "@zljs/core";

const DESKTOP = true;
const MOBILE = false;

const Probe = () => <p>{String(useIsDesktop())}</p>;

afterEach(() => {
  restoreBrowserStubs();
});

describe("useIsDesktop", () => {
  it("is true on a screen from 768px wide", () => {
    const matchMedia = vi.fn((media: string) => ({
      media,
      matches: true,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    vi.stubGlobal("matchMedia", matchMedia);

    const { result } = renderHook(() => useIsDesktop());

    expect(result.current).toBe(true);
    expect(matchMedia).toHaveBeenCalledWith("(min-width: 768px)");
  });

  it("is false on a narrower screen", () => {
    stubMatchMedia(MOBILE);

    const { result } = renderHook(() => useIsDesktop());

    expect(result.current).toBe(false);
  });

  it("follows the screen as it crosses the width", () => {
    const media = stubMatchMedia(DESKTOP);
    const { result } = renderHook(() => useIsDesktop());

    act(() => {
      media.change(MOBILE);
    });

    expect(result.current).toBe(false);

    act(() => {
      media.change(DESKTOP);
    });

    expect(result.current).toBe(true);
  });

  it("stops listening to the screen when the component leaves", () => {
    const media = stubMatchMedia(DESKTOP);
    const { unmount } = renderHook(() => useIsDesktop());

    expect(media.listeners.size).toBe(1);

    unmount();

    expect(media.listeners.size).toBe(0);
  });

  it("is null on the server, where there is no screen", () => {
    expect(renderToString(<Probe />)).toContain("null");
  });
});
