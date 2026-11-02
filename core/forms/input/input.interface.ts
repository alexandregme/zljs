import type {
  ChangeEvent,
  FocusEvent,
  HTMLInputAutoCompleteAttribute,
  KeyboardEvent,
  Ref,
} from "react";

type InputName =
  | { label: string; "aria-label"?: string }
  | { label?: undefined; "aria-label": string };

export type InputProps = InputName & {
  name?: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  value?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
};
