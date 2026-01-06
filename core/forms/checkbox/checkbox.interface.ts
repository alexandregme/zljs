import { ChangeEvent } from "react";

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
