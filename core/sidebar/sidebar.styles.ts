import { tv } from "tailwind-variants";

export const sidebar = tv({
  base: "h-screen bg-neutral-800 text-neutral-300 flex flex-col overflow-hidden transition-all duration-200 divide-y divide-neutral-600/50",
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
  base: "flex-1 min-h-0 overflow-y-auto overflow-x-hidden divide-y divide-neutral-600/50",
});

export const header = tv({
  base: "shrink-0 p-2",
});

export const section = tv({
  base: "grid gap-1 p-2",
});

export const item = tv({
  // [&>*+*] is the label: Text takes no className, and the icon comes first, so a link with no label has nothing to hide.
  base: "flex items-center rounded-md transition-colors h-10 px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current [&>*+*]:truncate [&>*+*]:transition-all [&>*+*]:duration-200",
  variants: {
    active: {
      true: "bg-neutral-700 text-white",
      false: "text-neutral-400 hover:bg-neutral-700/50 hover:text-white",
    },
    collapsed: {
      true: "[&>*+*]:w-0 [&>*+*]:opacity-0",
      false: "[&>*+*]:ml-2 [&>*+*]:opacity-100",
    },
  },
  defaultVariants: {
    active: false,
    collapsed: false,
  },
});

export const footer = tv({
  base: "shrink-0 h-16 p-3 flex items-center gap-3",
  variants: {
    collapsed: {
      true: "justify-center",
    },
  },
});

export const avatar = tv({
  base: "shrink-0 size-8 rounded-full bg-neutral-600 text-white text-xs font-medium flex items-center justify-center",
});

export const userInfo = tv({
  base: "flex flex-col min-w-0 text-white [&>*]:truncate [&>*:last-child]:text-xs [&>*:last-child]:text-neutral-400",
});

export const toggleButton = tv({
  base: "shrink-0 h-14 grid p-2 [&>button]:justify-start [&>button]:px-3 [&>button]:overflow-hidden [&>button]:whitespace-nowrap",
});
