import type { HTMLAttributeAnchorTarget, ReactNode } from "react";
import type { SemanticColor } from "../../types";

export type LinkVariant = "inline" | "nav";

export interface LinkProps {
  children: ReactNode;
  href: string;
  /**
   * Where the link opens, as on an HTML link: `_blank` is a new tab, for a
   * link that leaves the app. `_blank` also gets `rel="noopener noreferrer"`,
   * so the page it opens can't reach back into the app.
   */
  target?: HTMLAttributeAnchorTarget;
  /** `inline` is a link in a text. `nav` is a row of a menu, with no underline. */
  variant?: LinkVariant;
  color?: SemanticColor;
  /** The link to the current page: it gets `aria-current="page"`. */
  active?: boolean;
  /** The accessible name, for a link whose children have no text. */
  "aria-label"?: string;
  /** Called on a click, before the navigation, such as to close a menu. */
  onClick?: () => void;
}
