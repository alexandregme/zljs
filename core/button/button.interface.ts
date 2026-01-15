import { ReactNode } from "react";
import type { IconName } from "../icon/icon.interface";
import type { SemanticColor } from "../types";

export interface ButtonProps {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  color?: SemanticColor;
  icon?: IconName;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  "aria-label"?: string;
  onClick?: () => void;
}
