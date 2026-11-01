import { tv } from "tailwind-variants";
import { semanticTextColors } from "../types/colors.const";

export const text = tv({
  variants: {
    variant: {
      body: "text-base",
      caption: "text-sm",
      display: "text-3xl font-bold",
    },
    color: semanticTextColors,
  },
  defaultVariants: {
    variant: "body",
  },
});
