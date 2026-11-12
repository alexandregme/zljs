import { tv } from "tailwind-variants";

// `z-60`: it blocks the whole screen while the app fetches, an open modal
// (`z-50`) included.
export const loader = tv({
  base: "flex fixed inset-0 justify-center items-center bg-black/20 text-zl-primary z-60",
});
