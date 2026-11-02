import { useId } from "react";
import type { InputProps } from "./input.interface";
import { Error } from "../error";
import { wrapper, label, input } from "./input.styles";

export const Input = ({
  label: labelText,
  "aria-label": ariaLabel,
  name,
  type = "text",
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
}: InputProps) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={wrapper()}>
      {labelText && (
        <label htmlFor={id} className={label()}>
          {labelText}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        disabled={disabled}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={input()}
      />
      {error && <Error id={errorId} message={error} />}
    </div>
  );
};
