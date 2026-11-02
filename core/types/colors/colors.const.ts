import type { SemanticColor } from "./colors";

/**
 * The text class of each semantic color (Heading, Text, Icon). The values live in the
 * theme, in core/styles/colors.css. `none` inherits the color around it.
 */
export const semanticTextColors = {
  primary: "text-zl-primary",
  success: "text-zl-success",
  danger: "text-zl-danger",
  warning: "text-zl-warning",
  info: "text-zl-info",
  muted: "text-zl-muted",
  none: "",
} satisfies Record<SemanticColor, string>;
