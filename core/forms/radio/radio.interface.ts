import type { ChangeEvent, FocusEvent, KeyboardEvent, Ref } from "react";

type RadioName =
  | { label: string; "aria-label"?: string }
  | { label?: undefined; "aria-label": string };

export type RadioProps = RadioName & {
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
};
