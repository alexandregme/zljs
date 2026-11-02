import { tv } from "tailwind-variants";

export const notFound = tv({
  slots: {
    base: "flex flex-col items-center justify-center gap-6 min-h-dvh p-4 text-center",
    code: "text-6xl font-bold text-zl-muted",
    content: "flex flex-col gap-2 max-w-md",
  },
});
