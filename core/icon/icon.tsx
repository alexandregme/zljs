import * as LucideIcons from "lucide-react";
import type { IconProps } from "./icon.interface";
import { iconBrands, iconSizes } from "./icon.const";

export const Icon = ({ name, size = "md" }: IconProps) => {
  const isBrand = name.startsWith("Si");
  const IconComponent = isBrand
    ? iconBrands[name]
    : (LucideIcons[name as keyof typeof LucideIcons] as React.ElementType);

  if (!IconComponent) return <></>;

  return (
    <span data-testid={name}>
      <IconComponent size={iconSizes[size]} />
    </span>
  );
};
