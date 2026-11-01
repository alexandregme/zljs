import { tv } from "tailwind-variants";

export const wrapper = tv({
  base: "flex flex-col gap-1",
});

export const innerWrapper = tv({
  base: "flex cursor-pointer has-disabled:cursor-not-allowed",
  variants: {
    variant: {
      default: "w-fit items-center gap-2",
      card: "items-start gap-3 rounded-lg border border-gray-500 p-3 has-checked:border-zl-primary has-checked:ring-1 has-checked:ring-zl-primary has-disabled:bg-gray-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const checkbox = tv({
  base: "shrink-0 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed",
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
  base: "min-w-0 flex-1 text-sm text-gray-700 select-none",
});
