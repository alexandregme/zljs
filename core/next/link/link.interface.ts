import type { ReactNode } from "react";
import type { SemanticColor } from "../../types";

export interface LinkProps {
  children: ReactNode;
  href: string;
  color?: SemanticColor;
}
