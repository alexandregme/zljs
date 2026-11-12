import { tv } from "tailwind-variants";
import type { SemanticColor } from "../../types";

export const link = tv({
  // outline-current draws the focus in the text color.
  base: "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
  variants: {
    variant: {
      // The invisible ::after grows the touch target to 44px without changing the layout.
      inline:
        "relative rounded-sm underline underline-offset-2 hover:decoration-2 after:absolute after:top-1/2 after:left-1/2 after:h-11 after:w-full after:min-w-11 after:-translate-x-1/2 after:-translate-y-1/2",
      // A row of a menu. The translucent backgrounds work on a light or a dark surface.
      nav: "flex h-10 items-center gap-2 overflow-hidden rounded-md px-3 whitespace-nowrap transition-colors",
    },
    active: {
      true: "",
      false: "",
    },
    color: {
      primary: "text-zl-primary hover:text-zl-primary-strong",
      success: "text-zl-success hover:text-zl-success-strong",
      danger: "text-zl-danger hover:text-zl-danger-strong",
      warning: "text-zl-warning hover:text-zl-warning-strong",
      info: "text-zl-info hover:text-zl-info-strong",
      muted: "text-zl-muted hover:text-zl-muted-strong",
      none: "",
    } satisfies Record<SemanticColor, string>,
  },
  compoundVariants: [
    { variant: "nav", active: true, class: "bg-neutral-500/30" },
    { variant: "nav", active: false, class: "hover:bg-neutral-500/20" },
  ],
  defaultVariants: {
    variant: "inline",
    active: false,
    color: "primary",
  },
});
