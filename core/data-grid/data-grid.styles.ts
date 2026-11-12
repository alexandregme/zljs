import { tv } from "tailwind-variants";

export const dataGrid = tv({
  slots: {
    base: "grid grid-rows-[auto_auto_1fr] grid-cols-1 h-full w-full flex-1",
    table: "ag-grid h-full min-h-80 w-full z-0",
  },
});
