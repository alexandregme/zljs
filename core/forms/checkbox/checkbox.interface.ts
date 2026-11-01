import type { ChangeEvent, ReactNode } from "react";
import type { Size } from "../../types";

export type CheckboxVariant = "default" | "card";

export interface CheckboxProps {
  label: ReactNode;
  "aria-label"?: string;
  variant?: CheckboxVariant;
  size?: Size;
  checked?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
