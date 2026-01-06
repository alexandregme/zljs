import { useId } from "react";
import type { RadioProps } from "./radio.interface";

export const Radio = ({
  label,
  name,
  value,
  checked,
  disabled,
  onChange,
}: RadioProps) => {
  const id = useId();

  return (
    <div>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
