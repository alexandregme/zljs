import { forwardRef, useId } from "react";
import type { InputProps } from "./input.interface";
import { Error } from "../error";
import { wrapper, label, input } from "./input.styles";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label: labelText,
      name,
      type = "text",
      placeholder,
      value,
      error,
      disabled,
      onChange,
      onBlur,
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className={wrapper()}>
        <label htmlFor={id} className={label()}>
          {labelText}
        </label>
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
          className={input()}
        />
        {error && <Error message={error} />}
      </div>
    );
  },
);
