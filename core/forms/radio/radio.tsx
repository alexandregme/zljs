import { useId } from "react";
import type { RadioProps } from "./radio.interface";
import { wrapper, radio, label } from "./radio.styles";

export const Radio = ({
  label: labelText,
  name,
  value,
  checked,
  disabled,
  onChange,
}: RadioProps) => {
  const id = useId();

  return (
    <div className={wrapper()}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={radio()}
      />
      <label htmlFor={id} className={label()}>
        {labelText}
      </label>
    </div>
  );
};
