import { forwardRef, useId } from "react";
import type { InputProps } from "./input.interface";
import { Error } from "../error";
import { wrapper, label, input } from "./input.styles";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label: labelText,
      "aria-label": ariaLabel,
      name,
      type = "text",
      placeholder,
      value,
      error,
      disabled,
      onChange,
      onBlur,
      onKeyDown,
    },
    ref,
  ) => {
    const id = useId();

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
          value={value}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          aria-label={ariaLabel}
          className={input()}
        />
        {error && <Error message={error} />}
      </div>
    );
  },
);
