import {
  useForm,
  FormProvider as RHFFormProvider,
  type FieldValues,
} from "react-hook-form";
import type { FormProviderProps } from "./form-provider.interface";

export const FormProvider = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: FormProviderProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
    resolver,
  });

  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </RHFFormProvider>
  );
};
