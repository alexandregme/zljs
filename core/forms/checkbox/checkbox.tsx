import { useId } from "react";
import type { CheckboxProps } from "./checkbox.interface";
import { Error } from "../error";

export const Checkbox = ({
  label,
  checked,
  disabled,
  error,
  onChange,
}: CheckboxProps) => {
  const id = useId();

  return (
    <div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
      {error && <Error message={error} />}
    </div>
  );
};
