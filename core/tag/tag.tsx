import type { ReactNode } from "react";
import { tag } from "./tag.styles";

export interface TagProps {
  children: ReactNode;
  color?: "blue" | "green" | "red" | "yellow" | "gray";
  onRemove?: () => void;
  className?: string;
}

export const Tag = ({
  children,
  color = "blue",
  onRemove,
  className,
}: TagProps) => {
  return (
    <span className={tag({ color, className })}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 hover:opacity-70 focus:outline-none"
          aria-label="Remover"
        >
          ×
        </button>
      )}
    </span>
  );
};
