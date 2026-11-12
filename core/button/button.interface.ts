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
  fullWidth?: boolean;
  icon?: IconName;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  "aria-label"?: string;
  /** For a button that opens and closes something, such as a menu. */
  "aria-expanded"?: boolean;
  onClick?: () => void;
}
