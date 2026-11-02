import NextLink from "next/link.js";
import type { LinkProps } from "./link.interface";
import { link } from "./link.styles";

export const Link = ({ children, href, color = "primary" }: LinkProps) => {
  return (
    <NextLink href={href} className={link({ color })}>
      {children}
    </NextLink>
  );
};
