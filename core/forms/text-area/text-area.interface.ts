import type { ChangeEvent } from "react";

export interface TextAreaProps {
  label: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  error?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
