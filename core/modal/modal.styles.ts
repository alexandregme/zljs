import { tv } from "tailwind-variants";

export const overlay = tv({
  base: "fixed inset-0 bg-black/50",
});

export const content = tv({
  base: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full focus:outline-none max-h-[90vh] overflow-y-auto",
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      full: "max-w-6xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const header = tv({
  base: "flex items-start justify-between",
});

export const title = tv({
  base: "text-lg font-semibold text-gray-900 m-0",
});

export const description = tv({
  base: "text-sm text-gray-600 mt-2",
});

export const body = tv({
  base: "mt-4",
});
