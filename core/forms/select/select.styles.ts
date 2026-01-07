import { tv } from "tailwind-variants";

export const wrapper = tv({
  base: "flex flex-col gap-1",
});

export const label = tv({
  base: "text-sm font-medium text-gray-700",
});

export const select = tv({
  base: "px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed",
});
