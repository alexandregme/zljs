import { tv } from "tailwind-variants";

export const disclosure = tv({
  slots: {
    base: "w-full",
    // outline-current: the summary has no color of its own, so the outline follows the text around it.
    summary:
      "cursor-pointer rounded-sm py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
    content: "pt-2",
  },
  variants: {
    variant: {
      plain: {},
      outlined: {
        base: "rounded-lg border border-zl-border bg-zl-surface p-3",
      },
    },
  },
  defaultVariants: {
    variant: "plain",
  },
});
