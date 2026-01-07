import type { FormEvent, ReactNode } from "react";

export interface FormProps {
  children: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}
