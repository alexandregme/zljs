import { ChangeEvent } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}
