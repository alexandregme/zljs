import { tv } from "tailwind-variants";

export const tag = tv({
  base: "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
  variants: {
    color: {
      blue: "bg-blue-100 text-blue-700",
      green: "bg-green-100 text-green-700",
      red: "bg-red-100 text-red-700",
      yellow: "bg-yellow-100 text-yellow-700",
      gray: "bg-slate-100 text-slate-700",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});
