import { tv } from "tailwind-variants";

export const wrapper = tv({
  base: "flex items-center gap-2",
});

export const radio = tv({
  base: "w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed",
});

export const label = tv({
  base: "text-sm text-gray-700 select-none cursor-pointer",
});
