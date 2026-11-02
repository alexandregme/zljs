import { useId } from "react";
import type { SelectProps } from "./select.interface";
import { Error } from "../error";
import { wrapper, label, select } from "./select.styles";

export const Select = ({
  label: labelText,
  "aria-label": ariaLabel,
  name,
  options,
  placeholder,
  autoComplete,
  value,
  error,
  disabled,
  required,
  onChange,
  onBlur,
  onKeyDown,
  ref,
}: SelectProps) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={wrapper()}>
      {labelText && (
        <label htmlFor={id} className={label()}>
          {labelText}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        name={name}
        autoComplete={autoComplete}
        value={value}
        defaultValue={placeholder && value === undefined ? "" : undefined}
        disabled={disabled}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
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
      {error && <Error id={errorId} message={error} />}
    </div>
  );
};
