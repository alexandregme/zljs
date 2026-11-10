import { tv } from "tailwind-variants";

export const overlay = tv({
  base: "fixed inset-0 bg-black/50",
});

export const content = tv({
  base: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg p-6 w-full focus:outline-none max-h-[90vh] overflow-y-auto",
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
      primary: "bg-[color-mix(in_srgb,var(--color-zl-primary)_15%,white)]",
      success: "bg-[color-mix(in_srgb,var(--color-zl-success)_15%,white)]",
      danger: "bg-[color-mix(in_srgb,var(--color-zl-danger)_15%,white)]",
      warning: "bg-[color-mix(in_srgb,var(--color-zl-warning)_15%,white)]",
      info: "bg-[color-mix(in_srgb,var(--color-zl-info)_15%,white)]",
      muted: "bg-[color-mix(in_srgb,var(--color-zl-muted)_15%,white)]",
      none: "bg-white",
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
      none: "text-gray-900",
    },
  },
  defaultVariants: {
    color: "none",
  },
});

export const description = tv({
  base: "text-sm text-gray-600 mt-2",
});

export const body = tv({
  base: "mt-4",
});
