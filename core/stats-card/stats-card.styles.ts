import { tv } from "tailwind-variants";

export const statsCard = tv({
  base: "p-4 rounded-lg",
  variants: {
    color: {
      blue: "bg-blue-100 text-blue-900",
      red: "bg-red-100 text-red-900",
      yellow: "bg-yellow-100 text-yellow-900",
      green: "bg-green-100 text-green-900",
      gray: "bg-gray-100 text-gray-900",
      orange: "bg-orange-100 text-orange-900",
    },
  },
});
