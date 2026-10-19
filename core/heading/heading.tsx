import type { HeadingProps } from "./heading.interface";
import { headingTags } from "./heading.const";
import { heading } from "./heading.styles";

export const Heading = ({ children, level = 1, color }: HeadingProps) => {
  const Tag = headingTags[level];

  return <Tag className={heading({ level, color })}>{children}</Tag>;
};
