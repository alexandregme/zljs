interface ButtonProps {
  children: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const Button = ({ children, type = "button", onClick }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};
