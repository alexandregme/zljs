import { tv } from "tailwind-variants";

export const button = tv({
  // outline-current covers the colors with no outline class (ghost, none): without it, browsers keep their default focus color.
  base: "cursor-pointer font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center",
  variants: {
    variant: {
      default: "px-4 py-2 text-white text-sm gap-2 rounded-md",
      icon: "p-1 bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md",
      // The invisible ::after grows the touch target to 44px without changing the layout.
      link: "relative text-xs hover:underline rounded-sm after:absolute after:top-1/2 after:left-1/2 after:h-11 after:w-full after:min-w-11 after:-translate-x-1/2 after:-translate-y-1/2",
    },
    color: {
      primary: "bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-600",
      success:
        "bg-green-700 hover:bg-green-800 focus-visible:outline-green-700",
      danger: "bg-red-600 hover:bg-red-700 focus-visible:outline-red-600",
      warning:
        "bg-yellow-500 hover:bg-yellow-600 focus-visible:outline-yellow-700 text-gray-900",
      info: "bg-cyan-700 hover:bg-cyan-800 focus-visible:outline-cyan-700",
      ghost:
        "bg-transparent text-current hover:text-current hover:bg-neutral-500/20",
      none: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      color: "none",
      class: "bg-gray-100 text-gray-900 hover:bg-gray-200",
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
      class: "text-green-700 hover:text-green-900",
    },
    {
      variant: "link",
      color: "danger",
      class: "text-red-600 hover:text-red-800",
    },
    {
      variant: "link",
      color: "warning",
      class: "text-yellow-700 hover:text-yellow-900",
    },
    {
      variant: "link",
      color: "info",
      class: "text-cyan-700 hover:text-cyan-900",
    },
    {
      variant: "link",
      color: "none",
      class: "text-slate-600 hover:text-slate-800",
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
