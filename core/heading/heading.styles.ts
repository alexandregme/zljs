import { tv } from "tailwind-variants";

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
    color: {
      primary: "text-blue-600",
      success: "text-green-700",
      danger: "text-red-600",
      warning: "text-yellow-700",
      info: "text-sky-700",
      muted: "text-gray-500",
      none: "",
    },
  },
  defaultVariants: {
    level: 1,
  },
});
