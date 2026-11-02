import { useId } from "react";
import type { RadioProps } from "./radio.interface";
import { wrapper, radio, label } from "./radio.styles";

export const Radio = ({
  label: labelText,
  "aria-label": ariaLabel,
  name,
  value,
  checked,
  disabled,
  required,
  onChange,
  onBlur,
  onKeyDown,
  ref,
}: RadioProps) => {
  const id = useId();

  return (
    <label htmlFor={id} className={wrapper()}>
      <input
        ref={ref}
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel}
        className={radio()}
      />
      {labelText && <span className={label()}>{labelText}</span>}
    </label>
  );
};
