import type { ReactNode } from "react";
import type { FieldValues, DefaultValues, Resolver } from "react-hook-form";

export interface FormProviderProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: DefaultValues<T>;
  resolver?: Resolver<T>;
}
