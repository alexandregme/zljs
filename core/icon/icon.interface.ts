import type { iconNames } from "./icon.const";

export type IconName = (typeof iconNames)[number];

export interface IconProps {
  name: IconName;
}
