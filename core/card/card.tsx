import { Heading } from "../heading";
import { Text } from "../text";
import type { CardProps } from "./card.interface";
import { card } from "./card.styles";

export const Card = ({
  children,
  title,
  titleLevel = 2,
  message,
  color = "none",
}: CardProps) => {
  const { base, header } = card({ color });
  // Muted text is below 4.5:1 on a colored background, so it is only for white.
  const messageColor = color === "none" ? "muted" : "none";

  return (
    <div data-testid="card" className={base()}>
      {(title || message) && (
        <div className={header()}>
          {title && <Heading level={titleLevel}>{title}</Heading>}
          {message && <Text color={messageColor}>{message}</Text>}
        </div>
      )}
      {children}
    </div>
  );
};
