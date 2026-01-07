import { useId } from "react";
import type { TextAreaProps } from "./text-area.interface";
import { Error } from "../error";

export const TextArea = ({
  label,
  placeholder,
  value,
  rows = 3,
  error,
  disabled,
  onChange,
}: TextAreaProps) => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        rows={rows}
        disabled={disabled}
        onChange={onChange}
      />
      {error && <Error message={error} />}
    </div>
  );
};
