import { tv } from "tailwind-variants";

export const sidebar = tv({
  base: "h-dvh bg-neutral-800 text-neutral-300 flex flex-col overflow-hidden transition-[width] duration-200 divide-y divide-neutral-600/50",
  variants: {
    collapsed: {
      true: "w-14",
      false: "w-64",
    },
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
