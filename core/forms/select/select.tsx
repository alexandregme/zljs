import { useId } from "react";
import type { SelectProps } from "./select.interface";
import { Error } from "../error";
import { wrapper, label, select } from "./select.styles";

export const Select = ({
  label: labelText,
  options,
  value,
  placeholder,
  disabled,
  error,
  onChange,
}: SelectProps) => {
  const id = useId();

  return (
    <div className={wrapper()}>
      <label htmlFor={id} className={label()}>
        {labelText}
      </label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={select()}
      >
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
