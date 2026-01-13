import { useFormContext } from "react-hook-form";
import { Input } from "../../forms/input";
import type { FormInputProps } from "./form-input.interface";

export const FormInput = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled,
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];
  const errorMessage = fieldError?.message as string | undefined;

  return (
    <Input
      label={label}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      error={errorMessage}
      {...register(name)}
    />
  );
};
