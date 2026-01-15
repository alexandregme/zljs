import { HeadingProps } from "./heading.interface";

const levelStyles = {
  1: "text-3xl font-bold",
  2: "text-2xl font-bold",
  3: "text-xl font-semibold",
  4: "text-lg font-semibold",
  5: "text-base font-medium",
  6: "text-sm font-medium",
};

const tags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export const Heading = ({ children, level = 1 }: HeadingProps) => {
  const Tag = tags[level];
  const className = levelStyles[level];

  return <Tag className={className}>{children}</Tag>;
};
