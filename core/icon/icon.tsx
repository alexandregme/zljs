import * as LucideIcons from "lucide-react";
import type { IconProps } from "./icon.interface";
import { iconBrands, iconSizes } from "./icon.const";
import { icon } from "./icon.styles";

export const Icon = ({
  name,
  size = "md",
  color,
  "aria-label": ariaLabel,
}: IconProps) => {
  const isBrand = name.startsWith("Si");
  const IconComponent = isBrand
    ? iconBrands[name]
    : (LucideIcons[name as keyof typeof LucideIcons] as React.ElementType);

  if (!IconComponent) return <></>;

  return (
    <span
      data-testid={name}
      className={icon({ color })}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    >
      <IconComponent size={iconSizes[size]} aria-hidden="true" />
    </span>
  );
};
