import { useId } from "react";
import type { CheckboxProps } from "./checkbox.interface";
import { Error } from "../error";
import { wrapper, innerWrapper, checkbox, label } from "./checkbox.styles";

export const Checkbox = ({
  label: labelText,
  "aria-label": ariaLabel,
  variant,
  size,
  checked,
  disabled,
  error,
  onChange,
}: CheckboxProps) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={wrapper()}>
      <label htmlFor={id} className={innerWrapper({ variant })}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          aria-label={ariaLabel}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={checkbox({ size })}
        />
        <span className={label()}>{labelText}</span>
      </label>
      {error && <Error id={errorId} message={error} />}
    </div>
  );
};
