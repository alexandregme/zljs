import { tv } from "tailwind-variants";

export const topNav = tv({
  slots: {
    // The panels hang from it, so it is their anchor. The safe area keeps the
    // bar under the notch of a phone.
    base: "relative shrink-0 bg-neutral-800 pt-[env(safe-area-inset-top)] text-neutral-300",
    bar: "flex h-14 items-center gap-1 px-2",
    // Takes what the two buttons leave, with the home link in the middle of it.
    home: "flex min-w-0 flex-1 justify-center",
    // Over the page, under the bar, as wide as the screen. It scrolls when the
    // links don't fit in what is left of the screen.
    menu: "absolute inset-x-0 top-full z-10 max-h-[calc(100dvh-3.5rem)] divide-y divide-neutral-600/50 overflow-y-auto border-t border-neutral-600/50 bg-neutral-800 shadow-lg",
    section: "grid gap-1 p-2",
    account:
      "absolute inset-x-0 top-full z-10 flex items-center gap-3 border-t border-neutral-600/50 bg-neutral-800 p-3 shadow-lg",
    // Text takes no className, so the cut of a long name or email is set from here.
    user: "flex min-w-0 flex-1 flex-col text-white [&>*]:truncate",
  },
});
