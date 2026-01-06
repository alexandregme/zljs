import * as Icons from "react-icons/bi";

import type { IconProps } from "./icon.interface";

export const Icon = ({ name }: IconProps) => {
  const IconComponent = Icons[name];

  return (
    <span data-testid={name}>
      <IconComponent />
    </span>
  );
};
