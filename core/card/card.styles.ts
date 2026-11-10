import { tv } from "tailwind-variants";

export const card = tv({
  slots: {
    // A soft, wide shadow in the color of the card. shadow-sm only spreads 1 to
    // 3px and reads as part of the border on a white page.
    base: "flex flex-col gap-6 w-full p-6 rounded-2xl border shadow-lg",
    header: "flex flex-col gap-1",
  },
  variants: {
    color: {
      primary: {
        base: "border-zl-primary bg-zl-primary/15 shadow-zl-primary/20",
      },
      success: {
        base: "border-zl-success bg-zl-success/15 shadow-zl-success/20",
      },
      danger: { base: "border-zl-danger bg-zl-danger/15 shadow-zl-danger/20" },
      warning: {
        base: "border-zl-warning bg-zl-warning/15 shadow-zl-warning/20",
      },
      info: { base: "border-zl-info bg-zl-info/15 shadow-zl-info/20" },
      muted: { base: "border-zl-muted bg-zl-muted/15 shadow-zl-muted/20" },
      none: { base: "border-gray-200 bg-white shadow-black/12" },
    },
  },
  defaultVariants: {
    color: "none",
  },
});
