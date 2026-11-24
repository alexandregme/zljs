import { tv } from "tailwind-variants";

export const wrapper = tv({
  base: "flex flex-col gap-1",
});

export const label = tv({
  base: "text-sm font-medium text-zl-text-soft",
});

export const input = tv({
  base: "px-3 py-2 border border-zl-border-strong rounded-md text-sm placeholder:text-zl-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zl-primary disabled:bg-zl-surface-muted disabled:cursor-not-allowed",
});
