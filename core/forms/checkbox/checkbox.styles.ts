import { tv } from "tailwind-variants";

export const wrapper = tv({
  base: "flex flex-col gap-1",
});

export const innerWrapper = tv({
  base: "flex cursor-pointer has-disabled:cursor-not-allowed",
  variants: {
    variant: {
      default: "w-fit items-center gap-2",
      card: "items-center gap-3 rounded-lg border border-zl-border-strong p-3 has-checked:border-zl-primary has-checked:ring-1 has-checked:ring-zl-primary has-disabled:bg-zl-surface-muted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const checkbox = tv({
  base: "shrink-0 accent-zl-primary rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zl-primary disabled:cursor-not-allowed",
  variants: {
    size: {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const label = tv({
  base: "min-w-0 flex-1 text-sm text-zl-text-soft select-none",
});
