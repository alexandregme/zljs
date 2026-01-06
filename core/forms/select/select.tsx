import { useId } from "react";
import type { SelectProps } from "./select.interface";
import { Error } from "../error";

export const Select = ({
  label,
  options,
  value,
  placeholder,
  disabled,
  error,
  onChange,
}: SelectProps) => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} disabled={disabled} onChange={onChange}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <Error message={error} />}
    </div>
  );
};
