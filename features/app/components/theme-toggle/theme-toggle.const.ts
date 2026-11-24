import type { IconName } from "../../../../core/icon";
import type { Theme } from "../../hooks";

/** The icon of each theme. */
export const themeToggleIcons = {
  system: "Monitor",
  light: "Sun",
  dark: "Moon",
} satisfies Record<Theme, IconName>;
