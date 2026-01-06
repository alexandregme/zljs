import { useId } from "react";
import type { InputProps } from "./input.interface";
import { Error } from "../error";

export const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  error,
  disabled,
  onChange,
}: InputProps) => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      {error && <Error message={error} />}
    </div>
  );
};
