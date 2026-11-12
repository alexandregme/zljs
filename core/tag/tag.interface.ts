import type { ReactNode } from "react";
import type { AuxiliaryColor, SemanticColor, Size } from "../types";

export type TagColor = Exclude<SemanticColor, "none"> | AuxiliaryColor;

export interface TagProps {
  children: ReactNode;
  color?: TagColor;
  /** The text and the padding. `sm`, the default, is the smallest. */
  size?: Size;
  onRemove?: () => void;
  removeLabel?: string;
}
