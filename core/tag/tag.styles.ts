import { tv } from "tailwind-variants";

export const tag = tv({
  base: "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
  variants: {
    color: {
      primary: "bg-zl-primary/15 text-zl-primary-strong",
      success: "bg-zl-success/15 text-zl-success-strong",
      danger: "bg-zl-danger/15 text-zl-danger-strong",
      warning: "bg-zl-warning/15 text-zl-warning-strong",
      info: "bg-zl-info/15 text-zl-info-strong",
      muted: "bg-zl-muted/15 text-zl-muted-strong",
      orange: "bg-zl-orange/15 text-zl-orange-strong",
      pink: "bg-zl-pink/15 text-zl-pink-strong",
      purple: "bg-zl-purple/15 text-zl-purple-strong",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
