import type { Size } from "../types";

export type SpinnerVariant = "circle" | "dots" | "refresh";

export interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: Size;
}
