import { tv } from "tailwind-variants";

export const container = tv({
  base: "flex flex-col items-center justify-center min-h-screen p-4",
});

export const code = tv({
  base: "text-6xl font-bold text-gray-300 mb-4",
});

export const title = tv({
  base: "text-2xl font-semibold text-gray-900 mb-2",
});

export const message = tv({
  base: "text-gray-600 mb-6 text-center max-w-md",
});

export const link = tv({
  base: "text-blue-600 hover:text-blue-700 hover:underline",
});
