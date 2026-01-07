import { useId } from "react";
import type { TextAreaProps } from "./text-area.interface";
import { Error } from "../error";
import { wrapper, label, textarea } from "./text-area.styles";

export const TextArea = ({
  label: labelText,
  placeholder,
  value,
  rows = 3,
  error,
  disabled,
  onChange,
}: TextAreaProps) => {
  const id = useId();

  return (
    <div className={wrapper()}>
      <label htmlFor={id} className={label()}>
        {labelText}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        rows={rows}
        disabled={disabled}
        onChange={onChange}
        className={textarea()}
      />
      {error && <Error message={error} />}
    </div>
  );
};
