import { tv } from "tailwind-variants";

export const tabs = tv({
  slots: {
    // A border around the tabs and the panel, which holds them together. Takes
    // the height of a parent that has one, and the panel gets what the list
    // leaves, so a panel can fill the page. With no height around it, both
    // follow their content.
    base: "flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200",
    list: "flex shrink-0 overflow-x-auto border-b border-gray-200",
    // A line between the tabs, and the selected one stands out three ways: a
    // white background next to the gray ones, a line under it and its label in
    // the primary color. A tab grows to share the width of the list and never
    // shrinks under its content, so the list scrolls when they don't fit. The
    // outline sits inside the tab, because the border clips what overflows it.
    // The first and the last tab follow the round corners of the border, so
    // the outline does too.
    tab: "flex min-h-11 min-w-max shrink-0 grow basis-0 cursor-pointer items-center justify-between gap-3 border-r border-b-2 border-r-gray-200 border-b-transparent bg-gray-50 px-4 py-2 text-left text-gray-700 first:rounded-tl-[calc(var(--radius-lg)-1px)] last:rounded-tr-[calc(var(--radius-lg)-1px)] last:border-r-0 hover:text-gray-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zl-primary data-[state=active]:border-b-zl-primary data-[state=active]:bg-white data-[state=active]:text-zl-primary",
    // The label and the subtitle on the left, and the count at the right edge.
    text: "flex flex-col justify-center gap-0.5 [&>:first-child]:font-medium",
    panel:
      "min-h-0 flex-1 overflow-auto p-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zl-primary",
  },
});
