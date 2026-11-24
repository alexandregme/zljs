/** The themes, in the order a control shows them. */
export const themes = ["system", "light", "dark"] as const;

/** Where the browser keeps the choice. With no choice, the key is absent. */
export const THEME_STORAGE_KEY = "zljs-theme";

/** The id of the `<style>` that applies the choice to the page. */
export const THEME_STYLE_ID = "zljs-theme";

/**
 * Applies the stored choice before the page is drawn, so a user who chose a
 * theme other than the one of the system never sees the wrong one flash. It
 * goes in a `<script>` at the start of the page and runs before React does,
 * so it is written by hand and reads nothing from the bundle. It adds a
 * `<style>` to the head instead of an attribute to `<html>`: React ignores an
 * element it didn't render there, and reports an attribute as a mismatch.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){var s=document.createElement("style");s.id="${THEME_STYLE_ID}";s.textContent=":root:root{color-scheme:"+t+"}";document.head.appendChild(s)}}catch(e){}})()`;
