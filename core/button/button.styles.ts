import { tv } from "tailwind-variants";

export const button = tv({
  // outline-current covers the colors with no outline class (ghost, none): without it, browsers keep their default focus color.
  base: "cursor-pointer font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center",
  variants: {
    variant: {
      default: "px-4 py-2 text-sm gap-2 rounded-md",
      icon: "p-1 bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md",
      // The invisible ::after grows the touch target to 44px without changing the layout.
      link: "relative text-xs hover:underline rounded-sm after:absolute after:top-1/2 after:left-1/2 after:h-11 after:w-full after:min-w-11 after:-translate-x-1/2 after:-translate-y-1/2",
    },
    color: {
      primary:
        "bg-zl-primary-bg hover:bg-zl-primary-hover text-zl-primary-on focus-visible:outline-zl-primary",
      success:
        "bg-zl-success-bg hover:bg-zl-success-hover text-zl-success-on focus-visible:outline-zl-success",
      danger:
        "bg-zl-danger-bg hover:bg-zl-danger-hover text-zl-danger-on focus-visible:outline-zl-danger",
      warning:
        "bg-zl-warning-bg hover:bg-zl-warning-hover text-zl-warning-on focus-visible:outline-zl-warning",
      info: "bg-zl-info-bg hover:bg-zl-info-hover text-zl-info-on focus-visible:outline-zl-info",
      muted:
        "bg-zl-muted-bg hover:bg-zl-muted-hover text-zl-muted-on focus-visible:outline-zl-muted",
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
      class: "text-zl-primary hover:text-zl-primary-strong",
    },
    {
      variant: "link",
      color: "success",
      class: "text-zl-success hover:text-zl-success-strong",
    },
    {
      variant: "link",
      color: "danger",
      class: "text-zl-danger hover:text-zl-danger-strong",
    },
    {
      variant: "link",
      color: "warning",
      class: "text-zl-warning hover:text-zl-warning-strong",
    },
    {
      variant: "link",
      color: "info",
      class: "text-zl-info hover:text-zl-info-strong",
    },
    {
      variant: "link",
      color: "muted",
      class: "text-zl-muted hover:text-zl-muted-strong",
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
