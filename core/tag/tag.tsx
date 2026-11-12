import type { TagProps } from "./tag.interface";
import { Button } from "../button";
import { tag } from "./tag.styles";

export const Tag = ({
  children,
  color = "primary",
  size = "sm",
  onRemove,
  removeLabel = "Remover",
}: TagProps) => {
  return (
    <span data-testid="tag" className={tag({ color, size })}>
      {children}
      {onRemove && (
        <Button
          color="ghost"
          size={size}
          icon="X"
          aria-label={removeLabel}
          onClick={onRemove}
        />
      )}
    </span>
  );
};
