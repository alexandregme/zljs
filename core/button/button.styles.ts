import { tv } from "tailwind-variants";

export const button = tv({
  base: "cursor-pointer font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center",
  variants: {
    variant: {
      default:
        "px-4 py-2 text-white text-sm gap-2 rounded-md focus:ring-2 focus:ring-offset-2",
      icon: "p-1 bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring-gray-500 rounded-md focus:ring-2 focus:ring-offset-2",
      link: "text-xs hover:underline",
    },
    color: {
      primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      success: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
      danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      warning:
        "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-gray-900",
      info: "bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500",
      ghost:
        "bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-800 focus:ring-neutral-600",
      none: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      color: "none",
      class: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    },
    {
      variant: "default",
      size: "sm",
      class: "px-2 py-1 text-xs gap-1",
    },
    {
      variant: "icon",
      size: "sm",
      class: "p-0.5",
    },
    {
      variant: "default",
      size: "lg",
      class: "px-6 py-3 text-base gap-2",
    },
    {
      variant: "icon",
      size: "lg",
      class: "p-2",
    },
    {
      variant: "link",
      color: "primary",
      class: "text-blue-600 hover:text-blue-800",
    },
    {
      variant: "link",
      color: "success",
      class: "text-green-600 hover:text-green-800",
    },
    {
      variant: "link",
      color: "danger",
      class: "text-red-600 hover:text-red-800",
    },
    {
      variant: "link",
      color: "warning",
      class: "text-yellow-600 hover:text-yellow-800",
    },
    {
      variant: "link",
      color: "info",
      class: "text-cyan-600 hover:text-cyan-800",
    },
    {
      variant: "link",
      color: "ghost",
      class: "text-neutral-400 hover:text-neutral-600",
    },
    {
      variant: "link",
      color: "none",
      class: "text-slate-500 hover:text-slate-700",
    },
    {
      variant: "link",
      class: "bg-transparent hover:bg-transparent",
    },
  ],
  defaultVariants: {
    variant: "default",
    color: "primary",
    size: "md",
  },
});
