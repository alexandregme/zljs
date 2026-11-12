import type { ReactNode } from "react";

export interface TabsItem {
  /** Unique among the tabs. `defaultTab` and `onChange` use it. */
  id: string;
  label: string;
  /** Shows under `label`, in the tab. */
  subtitle?: string;
  /** Shows at the right edge of the tab, such as how many rows the panel has. */
  count?: number;
  /** The panel of the tab. Only the selected one is rendered. */
  children: ReactNode;
}

export interface TabsProps {
  tabs: TabsItem[];
  /** Names the list of tabs for screen readers. */
  "aria-label": string;
  /** The `id` of the tab selected at first. The first tab when not set. */
  defaultTab?: string;
  /** Called with the `id` of the tab the user selected. */
  onChange?: (id: string) => void;
}
