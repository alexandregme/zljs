import { tv } from "tailwind-variants";

export const themeToggle = tv({
  // The three share the width of the line, each as tall as a row of a menu.
  base: "flex gap-1 [&>button]:h-10 [&>button]:flex-1",
});
