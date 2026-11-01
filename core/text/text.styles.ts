import { tv } from "tailwind-variants";

export const text = tv({
  variants: {
    variant: {
      body: "text-base",
      caption: "text-sm",
      display: "text-3xl font-bold",
    },
    color: {
      primary: "text-blue-600",
      success: "text-green-700",
      danger: "text-red-600",
      warning: "text-yellow-700",
      info: "text-sky-700",
      none: "",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});
