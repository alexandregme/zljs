import { tv } from "tailwind-variants";

export const sidebar = tv({
  base: "h-screen bg-neutral-900 text-neutral-300 flex flex-col overflow-hidden transition-all duration-200",
  variants: {
    collapsed: {
      true: "w-14",
      false: "w-64",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});

export const nav = tv({
  base: "flex-1 min-h-0 overflow-y-auto overflow-x-hidden",
});

export const header = tv({
  base: "shrink-0 border-b border-neutral-700/50 grid p-2",
});

export const section = tv({
  base: "border-b border-neutral-700/50 last:border-b-0 grid gap-1 p-2",
});

export const item = tv({
  base: "flex w-full items-center rounded-md text-sm whitespace-nowrap transition-colors cursor-pointer p-1",
  variants: {
    active: {
      true: "bg-neutral-800 text-white",
      false: "text-neutral-400 hover:bg-neutral-800/50 hover:text-white",
    },
  },
  defaultVariants: {
    active: false,
  },
});
export const itemIcon = tv({
  base: "p-2",
});

export const itemLabel = tv({
  base: "truncate transition-all duration-200",
  variants: {
    collapsed: {
      true: "opacity-0 w-0",
      false: "opacity-100",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});

export const footer = tv({
  base: "shrink-0 border-t border-neutral-700/50 p-3 flex items-center gap-3 whitespace-nowrap",
});

export const avatar = tv({
  base: "shrink-0 w-8 h-8 rounded-full bg-neutral-700 text-white text-xs font-medium flex items-center justify-center",
});

export const userInfo = tv({
  base: "flex flex-col min-w-0",
});

export const userName = tv({
  base: "text-sm text-white truncate",
});

export const userEmail = tv({
  base: "text-xs text-neutral-400",
});

export const toggleButton = tv({
  base: "shrink-0 border-t border-neutral-700/50 grid p-2 [&>button]:justify-start [&>button]:overflow-hidden [&>button]:whitespace-nowrap",
});
