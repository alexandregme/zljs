import { ChangeEvent } from "react";

export interface InputProps {
  label: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  value?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
