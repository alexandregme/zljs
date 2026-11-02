import { tv } from "tailwind-variants";
import { semanticTextColors } from "../types/colors";

export const icon = tv({
  variants: {
    color: semanticTextColors,
  },
});
