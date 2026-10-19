import { tv } from "tailwind-variants";

export const text = tv({
  variants: {
    variant: {
      body: "text-base",
      caption: "text-sm",
      display: "text-3xl font-bold",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});
