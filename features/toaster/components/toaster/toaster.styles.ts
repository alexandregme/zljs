import type { CSSProperties } from "react";
import { tv } from "tailwind-variants";

// Sonner's CSS has no layer, so it beats Tailwind's unless the class is important.
const focusOutline =
  "focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-current!";

export const toaster = tv({
  slots: {
    toast: focusOutline,
    closeButton: focusOutline,
  },
});

// The colors are written out so Tailwind finds these theme values in the source.
export const toasterColors = {
  "--success-text": "var(--color-zl-success-strong)",
  "--success-bg": "color-mix(in oklab, var(--color-zl-success) 15%, white)",
  "--success-border": "color-mix(in oklab, var(--color-zl-success) 30%, white)",
  "--info-text": "var(--color-zl-info-strong)",
  "--info-bg": "color-mix(in oklab, var(--color-zl-info) 15%, white)",
  "--info-border": "color-mix(in oklab, var(--color-zl-info) 30%, white)",
  "--warning-text": "var(--color-zl-warning-strong)",
  "--warning-bg": "color-mix(in oklab, var(--color-zl-warning) 15%, white)",
  "--warning-border": "color-mix(in oklab, var(--color-zl-warning) 30%, white)",
  "--error-text": "var(--color-zl-danger-strong)",
  "--error-bg": "color-mix(in oklab, var(--color-zl-danger) 15%, white)",
  "--error-border": "color-mix(in oklab, var(--color-zl-danger) 30%, white)",
} as CSSProperties;
