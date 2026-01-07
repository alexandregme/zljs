import { useId } from "react";
import type { InputProps } from "./input.interface";
import { Error } from "../error";
import { wrapper, label, input } from "./input.styles";

export const Input = ({
  label: labelText,
  type = "text",
  placeholder,
  value,
  error,
  disabled,
  onChange,
}: InputProps) => {
  const id = useId();

  return (
    <div className={wrapper()}>
      <label htmlFor={id} className={label()}>
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={input()}
      />
      {error && <Error message={error} />}
    </div>
  );
};
