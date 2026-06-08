import type { ReactNode } from "react";
import type { SemanticColor } from "../types";

export interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: SemanticColor;
}
