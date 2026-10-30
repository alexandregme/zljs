import type { Size } from "../types";
import type { iconNames } from "./icon.const";

export type IconName = (typeof iconNames)[number];

export interface IconProps {
  name: IconName;
  size?: Size;
  "aria-label"?: string;
}
