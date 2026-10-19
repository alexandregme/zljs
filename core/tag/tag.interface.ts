import type { ReactNode } from "react";
import type { DataColor } from "../types";

export interface TagProps {
  children: ReactNode;
  color?: DataColor;
  onRemove?: () => void;
}
