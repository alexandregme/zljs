import type { ButtonProps } from "./button.interface";
import { button } from "./button.styles";

export const Button = ({ children, type = "button", onClick }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={button()}>
      {children}
    </button>
  );
};
