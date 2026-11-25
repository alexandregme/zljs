import { act, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { restoreBrowserStubs } from "@test-utils";
import { setTheme, useTheme } from "@zljs/core";
import {
  THEME_STORAGE_KEY,
  THEME_STYLE_ID,
  themeScript,
} from "./use-theme.const";

// Each rule also switches the two variables a Lightning CSS build puts in
// place of `light-dark()`, the way that build does for the theme of the system.
const DARK_RULE =
  ":root:root{color-scheme:dark;--lightningcss-light: ;--lightningcss-dark:initial}";
const LIGHT_RULE =
  ":root:root{color-scheme:light;--lightningcss-light:initial;--lightningcss-dark: }";

const Probe = () => <p>{useTheme().theme}</p>;

const themeStyle = () => document.getElementById(THEME_STYLE_ID);

// What another tab does when the user picks a theme there.
const changeInAnotherTab = (key: string | null, value?: string) => {
  if (value) {
    localStorage.setItem(THEME_STORAGE_KEY, value);
  } else {
    localStorage.removeItem(THEME_STORAGE_KEY);
  }
  window.dispatchEvent(new StorageEvent("storage", { key }));
};

const blockStorage = () => {
  const blocked = () => {
    throw new DOMException("", "SecurityError");
  };

  vi.spyOn(Storage.prototype, "getItem").mockImplementation(blocked);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(blocked);
  vi.spyOn(Storage.prototype, "removeItem").mockImplementation(blocked);
};

// The choice lives in the browser, which every test shares.
afterEach(() => {
  restoreBrowserStubs();
  localStorage.clear();
  themeStyle()?.remove();
});

describe("useTheme", () => {
  it("is system while the user chose no theme", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("system");
    expect(themeStyle()).toHaveTextContent("");
  });

  it("is the theme the browser keeps, and applies it to the page", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");
    expect(themeStyle()).toHaveTextContent(DARK_RULE);
    expect(themeStyle()?.parentElement).toBe(document.head);
  });

  it("is system when the browser keeps a value that is no theme", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "sepia");

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("system");
    expect(themeStyle()).toHaveTextContent("");
  });

  it("changes the theme of the page and keeps the choice in the browser", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("dark");
    });

    expect(result.current.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(themeStyle()).toHaveTextContent(DARK_RULE);

    act(() => {
      result.current.setTheme("light");
    });

    expect(result.current.theme).toBe("light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(themeStyle()).toHaveTextContent(LIGHT_RULE);
    expect(document.querySelectorAll(`#${THEME_STYLE_ID}`)).toHaveLength(1);
  });

  it("goes back to the system and forgets the choice", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("system");
    });

    expect(result.current.theme).toBe("system");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(themeStyle()).toHaveTextContent("");
  });

  it("follows a change made outside a component", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      setTheme("dark");
    });

    expect(result.current.theme).toBe("dark");
  });

  it("follows the choice made in another tab", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      changeInAnotherTab(THEME_STORAGE_KEY, "dark");
    });

    expect(result.current.theme).toBe("dark");
    expect(themeStyle()).toHaveTextContent(DARK_RULE);

    // A tab that clears the whole storage sends no key.
    act(() => {
      changeInAnotherTab(null);
    });

    expect(result.current.theme).toBe("system");
    expect(themeStyle()).toHaveTextContent("");
  });

  it("ignores what another tab stores under another key", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      changeInAnotherTab("another-key", "dark");
    });

    expect(themeStyle()).toHaveTextContent("");

    // The value is in the browser, but nothing told the page to apply it.
    expect(result.current.theme).toBe("system");
  });

  it("stops listening when the component leaves", () => {
    const { unmount } = renderHook(() => useTheme());

    unmount();
    changeInAnotherTab(THEME_STORAGE_KEY, "dark");

    expect(themeStyle()).toHaveTextContent("");
  });

  it("is system in a browser that blocks the storage, and still changes the page", () => {
    blockStorage();
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("system");

    act(() => {
      result.current.setTheme("dark");
    });

    expect(themeStyle()).toHaveTextContent(DARK_RULE);

    act(() => {
      result.current.setTheme("system");
    });

    expect(themeStyle()).toHaveTextContent("");
  });

  it("is system on the server, where the choice can't be read", () => {
    expect(renderToString(<Probe />)).toContain("system");
  });
});

describe("themeScript", () => {
  it("applies the theme the browser keeps before the page is drawn", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");

    new Function(themeScript)();

    expect(themeStyle()).toHaveTextContent(DARK_RULE);
    expect(themeStyle()?.parentElement).toBe(document.head);
  });

  it("applies the light theme the browser keeps", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");

    new Function(themeScript)();

    expect(themeStyle()).toHaveTextContent(LIGHT_RULE);
  });

  it("leaves the page to the system when the browser keeps no theme", () => {
    new Function(themeScript)();

    expect(themeStyle()).not.toBeInTheDocument();
  });

  it("leaves the page to the system when the browser keeps a value that is no theme", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "sepia");

    new Function(themeScript)();

    expect(themeStyle()).not.toBeInTheDocument();
  });

  it("doesn't break the page in a browser that blocks the storage", () => {
    blockStorage();

    expect(() => new Function(themeScript)()).not.toThrow();
    expect(themeStyle()).not.toBeInTheDocument();
  });

  it("is reused by the hook, so the page keeps a single style", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    new Function(themeScript)();

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("light");
    });

    expect(document.querySelectorAll(`#${THEME_STYLE_ID}`)).toHaveLength(1);
    expect(themeStyle()).toHaveTextContent(LIGHT_RULE);
  });
});
