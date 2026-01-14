import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

export interface InputProps {
  label?: string;
  "aria-label"?: string;
  name?: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  value?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}
