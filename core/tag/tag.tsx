import type { TagProps } from "./tag.interface";
import { Button } from "../button";
import { tag } from "./tag.styles";

export const Tag = ({ children, color = "blue", onRemove }: TagProps) => {
  return (
    <span data-testid="tag" className={tag({ color })}>
      {children}
      {onRemove && (
        <Button size="sm" icon="X" aria-label="Remover" onClick={onRemove} />
      )}
    </span>
  );
};
