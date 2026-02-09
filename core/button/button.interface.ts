import { ReactNode } from "react";
import type { IconName } from "../icon/icon.interface";
import type { SemanticColor } from "../types";

export type ButtonVariant = "default" | "icon" | "link";

export interface ButtonProps {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  color?: SemanticColor | "none";
  icon?: IconName;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  "aria-label"?: string;
  onClick?: () => void;
}
