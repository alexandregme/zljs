import type { ReactNode } from "react";
import type { IconName } from "../icon/icon.interface";
import type { SemanticColor, Size } from "../types";

export type ButtonVariant = "default" | "icon" | "ghost" | "link";

export interface ButtonProps {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  color?: SemanticColor;
  size?: Size;
  icon?: IconName;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  "aria-label"?: string;
  onClick?: () => void;
}
