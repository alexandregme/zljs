import { tv } from "tailwind-variants";
import { semanticTextColors } from "../types/colors.const";

export const heading = tv({
  variants: {
    level: {
      1: "text-3xl font-bold",
      2: "text-2xl font-bold",
      3: "text-xl font-semibold",
      4: "text-lg font-semibold",
      5: "text-base font-medium",
      6: "text-sm font-medium",
    },
    color: semanticTextColors,
  },
  defaultVariants: {
    level: 1,
  },
});
