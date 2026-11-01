import type { TextProps } from "./text.interface";
import { text } from "./text.styles";

export const Text = ({
  children,
  as: Tag = "p",
  variant = "body",
  color,
}: TextProps) => {
  return (
    <Tag data-testid="text" className={text({ variant, color })}>
      {children}
    </Tag>
  );
};
