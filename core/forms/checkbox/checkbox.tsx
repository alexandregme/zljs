import { useId } from "react";
import type { CheckboxProps } from "./checkbox.interface";
import { Error } from "../error";
import { wrapper, innerWrapper, checkbox, label } from "./checkbox.styles";

export const Checkbox = ({
  label: labelText,
  checked,
  disabled,
  error,
  onChange,
}: CheckboxProps) => {
  const id = useId();

  return (
    <div className={wrapper()}>
      <div className={innerWrapper()}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className={checkbox()}
        />
        <label htmlFor={id} className={label()}>
          {labelText}
        </label>
      </div>
      {error && <Error message={error} />}
    </div>
  );
};
