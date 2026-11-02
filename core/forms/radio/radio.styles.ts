import { tv } from "tailwind-variants";

export const wrapper = tv({
  base: "flex w-fit items-center gap-2 cursor-pointer has-disabled:cursor-not-allowed",
});

export const radio = tv({
  base: "w-4 h-4 shrink-0 accent-zl-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zl-primary disabled:cursor-not-allowed",
});

export const label = tv({
  base: "text-sm text-gray-700 select-none",
});
