import { tv } from "tailwind-variants";

export const wrapper = tv({
  base: "flex flex-col gap-1",
});

export const label = tv({
  base: "text-sm font-medium text-gray-700",
});

export const textarea = tv({
  base: "px-3 py-2 border border-gray-500 rounded-md text-sm placeholder:text-gray-500 resize-y focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zl-primary disabled:bg-gray-100 disabled:cursor-not-allowed",
});
