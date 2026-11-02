import type {
  ChangeEvent,
  FocusEvent,
  HTMLInputAutoCompleteAttribute,
  KeyboardEvent,
  Ref,
} from "react";

export interface SelectOption {
  value: string;
  label: string;
}

type SelectName =
  | { label: string; "aria-label"?: string }
  | { label?: undefined; "aria-label": string };

export type SelectProps = SelectName & {
  name?: string;
  options: SelectOption[];
  placeholder?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  value?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: FocusEvent<HTMLSelectElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLSelectElement>) => void;
  ref?: Ref<HTMLSelectElement>;
};
