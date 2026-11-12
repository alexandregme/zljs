import type { ReactNode } from "react";
import type { SemanticColor } from "../../types";

export type LinkVariant = "inline" | "nav";

export interface LinkProps {
  children: ReactNode;
  href: string;
  /** `inline` is a link in a text. `nav` is a row of a menu, with no underline. */
  variant?: LinkVariant;
  color?: SemanticColor;
  /** The link to the current page: it gets `aria-current="page"`. */
  active?: boolean;
  /** The accessible name, for a link whose children have no text. */
  "aria-label"?: string;
}
