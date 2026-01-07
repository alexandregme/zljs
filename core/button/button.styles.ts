import { tv } from "tailwind-variants";

export const button = tv({
  base: "cursor-pointer font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center justify-center",
  variants: {
    variant: {
      default:
        "px-4 py-2 bg-blue-600 text-white text-sm hover:bg-blue-700 gap-2",
      icon: "p-1 bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
