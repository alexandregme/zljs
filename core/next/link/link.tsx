import NextLink from "next/link.js";
import type { LinkProps } from "./link.interface";
import { link } from "./link.styles";

export const Link = ({
  children,
  href,
  variant = "inline",
  color = "primary",
  active = false,
  "aria-label": ariaLabel,
  onClick,
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      className={link({ variant, color, active })}
      {...(active && { "aria-current": "page" })}
    >
      {children}
    </NextLink>
  );
};
