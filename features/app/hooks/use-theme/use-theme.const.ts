/** The themes, in the order a control shows them. */
export const themes = ["system", "light", "dark"] as const;

/** Where the browser keeps the choice. With no choice, the key is absent. */
export const THEME_STORAGE_KEY = "zljs-theme";

/** The id of the `<style>` that applies the choice to the page. */
export const THEME_STYLE_ID = "zljs-theme";

/**
 * The rule that applies each choice to the page. `:root` twice beats a
 * `color-scheme` the app sets on `:root`, wherever its CSS loads.
 *
 * `color-scheme` alone is enough where the browser gets `light-dark()` as it
 * was written. A build that runs Lightning CSS with older browsers as target,
 * as the production build of Next.js does, rewrites `light-dark(a, b)` to
 * `var(--lightningcss-light, a) var(--lightningcss-dark, b)` and switches the
 * two variables only where it sees a `color-scheme` at build time, so only the
 * theme of the system would work. The rule sets the same two variables, the
 * way that build does, so the choice reaches those colors too.
 */
export const THEME_RULES = {
  light:
    ":root:root{color-scheme:light;--lightningcss-light:initial;--lightningcss-dark: }",
  dark: ":root:root{color-scheme:dark;--lightningcss-light: ;--lightningcss-dark:initial}",
} as const;

/**
 * Applies the stored choice before the page is drawn, so a user who chose a
 * theme other than the one of the system never sees the wrong one flash. It
 * goes in a `<script>` at the start of the page and runs before React does,
 * so it is written by hand and reads nothing from the bundle. It adds a
 * `<style>` to the head instead of an attribute to `<html>`: React ignores an
 * element it didn't render there, and reports an attribute as a mismatch.
 */
export const themeScript = `(function(){try{var r=${JSON.stringify(THEME_RULES)},t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){var s=document.createElement("style");s.id="${THEME_STYLE_ID}";s.textContent=r[t];document.head.appendChild(s)}}catch(e){}})()`;
