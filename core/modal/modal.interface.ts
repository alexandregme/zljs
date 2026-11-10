import type { ReactNode } from "react";
import type { SemanticColor } from "../types";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  /** The width. `xs` is the smallest, for a short question and its buttons. */
  size?: ModalSize;
  /** The color of the title and a light background in that color. `none`, the default, is white. */
  color?: SemanticColor;
}
