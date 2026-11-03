import type { ReactNode } from "react";
import type { AuxiliaryColor, SemanticColor } from "../types";

export type TagColor = Exclude<SemanticColor, "none"> | AuxiliaryColor;

export interface TagProps {
  children: ReactNode;
  color?: TagColor;
  onRemove?: () => void;
  removeLabel?: string;
}
