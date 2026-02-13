import { tv } from "tailwind-variants";

export const button = tv({
  base: "cursor-pointer font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center",
  variants: {
    variant: {
      default:
        "px-4 py-2 text-white text-sm gap-2 rounded-md focus:ring-2 focus:ring-offset-2",
      icon: "p-1 bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring-gray-500 rounded-md focus:ring-2 focus:ring-offset-2",
      ghost:
        "p-2 gap-2 text-sm bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md focus-visible:ring-2 focus-visible:ring-neutral-600",
      link: "text-xs underline bg-transparent hover:no-underline",
    },
    color: {
      primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      success: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
      danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      warning:
        "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-gray-900",
      info: "bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500",
      none: "",
    },
  },
  compoundVariants: [
    {
      variant: "link",
      color: "primary",
      class: "bg-transparent text-blue-600 hover:text-blue-800",
    },
    {
      variant: "link",
      color: "danger",
      class: "bg-transparent text-red-600 hover:text-red-800",
    },
    {
      variant: "link",
      color: "none",
      class: "text-slate-500 hover:text-slate-700",
    },
  ],
  defaultVariants: {
    variant: "default",
    color: "primary",
  },
});
