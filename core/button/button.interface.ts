import type { ReactNode } from "react";
import type { IconName } from "../icon/icon.interface";
import type { SemanticColor, Size } from "../types";

export type ButtonVariant = "default" | "icon" | "link";

export type ButtonColor = SemanticColor | "ghost";

export interface ButtonProps {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: Size;
  icon?: IconName;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  "aria-label"?: string;
  onClick?: () => void;
}
