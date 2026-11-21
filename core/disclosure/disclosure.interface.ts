import type { ReactNode } from "react";

export type DisclosureVariant = "plain" | "outlined";

export interface DisclosureProps {
  /** Hidden until the user opens it. */
  children: ReactNode;
  /** Always visible: the line the user clicks to open and close. */
  summary: ReactNode;
  /** Starts open. The user can still close it. */
  defaultOpen?: boolean;
  /** `outlined` draws a border around it, for an item of a list. */
  variant?: DisclosureVariant;
}
