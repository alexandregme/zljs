import { tv } from "tailwind-variants";

export const pageWrapper = tv({
  slots: {
    base: "flex items-center justify-center min-h-dvh p-4",
    content: "w-full max-w-sm",
  },
});
