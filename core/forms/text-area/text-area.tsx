import { useId } from "react";
import type { TextAreaProps } from "./text-area.interface";
import { Error } from "../error";
import { wrapper, label, textarea } from "./text-area.styles";

export const TextArea = ({
  label: labelText,
  "aria-label": ariaLabel,
  name,
  placeholder,
  autoComplete,
  value,
  rows = 3,
  error,
  disabled,
  required,
  onChange,
  onBlur,
  onKeyDown,
  ref,
}: TextAreaProps) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={wrapper()}>
      {labelText && (
        <label htmlFor={id} className={label()}>
          {labelText}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        rows={rows}
        disabled={disabled}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={textarea()}
      />
      {error && <Error id={errorId} message={error} />}
    </div>
  );
};
