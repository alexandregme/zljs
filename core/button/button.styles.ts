import { tv } from "tailwind-variants";

export const button = tv({
  base: "cursor-pointer font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center",
  variants: {
    variant: {
      default: "px-4 py-2 text-white text-sm gap-2",
      icon: "p-1 bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    },
    color: {
      primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      success: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
      danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      warning: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "primary",
  },
});
