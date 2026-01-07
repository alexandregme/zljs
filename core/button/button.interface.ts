import { ReactNode } from "react";
import type { IconName } from "../icon/icon.interface";

export interface ButtonProps {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  icon?: IconName;
  iconPosition?: "left" | "right";
  "aria-label"?: string;
  onClick?: () => void;
}
