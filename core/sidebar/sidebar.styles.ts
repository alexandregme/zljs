import { tv } from "tailwind-variants";

export const sidebar = tv({
  // A surface beside the page, with a line between the two: white in the light
  // theme and dark in the dark one. The line is an inset shadow, which takes no
  // width: a border would move what is centered in the collapsed sidebar.
  // It takes the height of the screen and stays in place while the page beside
  // it scrolls.
  base: "sticky top-0 shrink-0 h-dvh shadow-[inset_-1px_0_0_var(--color-zl-border)] bg-zl-surface text-zl-text-soft flex flex-col overflow-hidden transition-[width] duration-200 divide-y divide-zl-border",
  variants: {
    collapsed: {
      true: "w-14",
      false: "w-64",
    },
  },
});

export const nav = tv({
  base: "flex-1 min-h-0 overflow-y-auto overflow-x-hidden divide-y divide-zl-border",
});

export const header = tv({
  base: "shrink-0 p-2",
});

export const section = tv({
  base: "grid gap-1 p-2",
});

// A row like the collapse button: the icon stays in place when the text goes.
export const actions = tv({
  base: "shrink-0 grid gap-1 p-2 [&>button]:h-10 [&>button]:justify-start [&>button]:px-3 [&>button]:overflow-hidden [&>button]:whitespace-nowrap",
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
  base: "shrink-0 size-8 rounded-full bg-zl-surface-hover text-zl-text text-xs font-medium flex items-center justify-center",
});

export const userInfo = tv({
  base: "flex flex-col min-w-0 text-zl-text [&>*]:truncate [&>*:last-child]:text-xs [&>*:last-child]:text-zl-muted",
});

export const toggleButton = tv({
  base: "shrink-0 h-14 grid p-2 [&>button]:justify-start [&>button]:px-3 [&>button]:overflow-hidden [&>button]:whitespace-nowrap",
});
