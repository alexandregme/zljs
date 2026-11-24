import { tv } from "tailwind-variants";

// `z-50` on both: a modal covers everything on the page, the panels of the
// navigation included, and only the toasts stay over it.
export const overlay = tv({
  base: "fixed inset-0 z-50 bg-black/50",
});

export const content = tv({
  base: "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg p-6 text-zl-text w-full focus:outline-none max-h-[90vh] overflow-y-auto",
  variants: {
    size: {
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      full: "max-w-6xl",
    },
    // An opaque tint: a translucent one, as Card has, would show the dark overlay behind the modal.
    color: {
      primary:
        "bg-[color-mix(in_srgb,var(--color-zl-primary)_15%,var(--color-zl-surface))]",
      success:
        "bg-[color-mix(in_srgb,var(--color-zl-success)_15%,var(--color-zl-surface))]",
      danger:
        "bg-[color-mix(in_srgb,var(--color-zl-danger)_15%,var(--color-zl-surface))]",
      warning:
        "bg-[color-mix(in_srgb,var(--color-zl-warning)_15%,var(--color-zl-surface))]",
      info: "bg-[color-mix(in_srgb,var(--color-zl-info)_15%,var(--color-zl-surface))]",
      muted:
        "bg-[color-mix(in_srgb,var(--color-zl-muted)_15%,var(--color-zl-surface))]",
      none: "bg-zl-surface",
    },
  },
  defaultVariants: {
    size: "md",
    color: "none",
  },
});

export const header = tv({
  base: "flex items-start justify-between",
});

export const title = tv({
  base: "text-lg font-semibold m-0",
  variants: {
    // The strong value, as the colored toasts use: the plain one is too light on the tint.
    color: {
      primary: "text-zl-primary-strong",
      success: "text-zl-success-strong",
      danger: "text-zl-danger-strong",
      warning: "text-zl-warning-strong",
      info: "text-zl-info-strong",
      muted: "text-zl-muted-strong",
      none: "text-zl-text",
    },
  },
  defaultVariants: {
    color: "none",
  },
});

export const description = tv({
  base: "text-sm text-zl-text-soft mt-2",
});

export const body = tv({
  base: "mt-4",
});
