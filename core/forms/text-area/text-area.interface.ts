import type {
  ChangeEvent,
  FocusEvent,
  HTMLInputAutoCompleteAttribute,
  KeyboardEvent,
  Ref,
} from "react";

type TextAreaName =
  | { label: string; "aria-label"?: string }
  | { label?: undefined; "aria-label": string };

export type TextAreaProps = TextAreaName & {
  name?: string;
  placeholder?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  value?: string;
  rows?: number;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  ref?: Ref<HTMLTextAreaElement>;
};
