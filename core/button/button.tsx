import type { ButtonProps } from "./button.interface";

export const Button = ({ children, type = "button", onClick }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};
