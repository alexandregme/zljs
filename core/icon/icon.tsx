import * as LucideIcons from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { IconProps } from "./icon.interface";

const brandIcons: Record<string, React.ElementType> = { SiWhatsapp };

export const Icon = ({ name }: IconProps) => {
  const isBrand = name.startsWith("Si");
  const IconComponent = isBrand
    ? brandIcons[name]
    : (LucideIcons[name as keyof typeof LucideIcons] as React.ElementType);

  if (!IconComponent) return <></>;

  return (
    <span data-testid={name}>
      <IconComponent size={16} />
    </span>
  );
};
