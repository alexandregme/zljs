import type { ReactNode } from "react";
import type { SemanticColor } from "../types";

export interface CardProps {
  children: ReactNode;
  /** Shows above the children, as a heading. */
  title?: string;
  /** The heading level of `title`: 1 when the card is the whole page. */
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Shows under `title`. Muted on a white card. */
  message?: string;
  /** The border and a light background in that color. `none` is white. */
  color?: SemanticColor;
}
