import type { SemanticColor } from "../types";

export type TextVariant = "body" | "caption" | "display";

export interface TextProps {
  children: string | number;
  as?: "p" | "span";
  variant?: TextVariant;
  color?: SemanticColor;
}
