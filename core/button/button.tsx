import type { ButtonProps } from "./button.interface";
import { Icon } from "../icon";
import { button } from "./button.styles";

export const Button = ({
  children,
  type = "button",
  color = "primary",
  icon,
  iconPosition = "left",
  "aria-label": ariaLabel,
  onClick,
}: ButtonProps) => {
  const isIconOnly = icon && !children;
  const variant = isIconOnly ? "icon" : "default";

  const renderContent = () => {
    if (!icon) {
      return children;
    }

    const iconElement = <Icon name={icon} />;

    if (isIconOnly) {
      return iconElement;
    }

    return iconPosition === "left" ? (
      <>
        {iconElement}
        {children}
      </>
    ) : (
      <>
        {children}
        {iconElement}
      </>
    );
  };

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={button({ variant, color: isIconOnly ? "none" : color })}
    >
      {renderContent()}
    </button>
  );
};
