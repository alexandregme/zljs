import type { SemanticColor, Size } from "../types";
import type { iconNames } from "./icon.const";

export type IconName = (typeof iconNames)[number];

/** The sizes every component has, and `xl` for an icon that stands alone. */
export type IconSize = Size | "xl";

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: SemanticColor;
  "aria-label"?: string;
}
