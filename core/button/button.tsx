import type { ButtonProps } from "./button.interface";
import { Icon } from "../icon";
import { button } from "./button.styles";

export const Button = ({
  children,
  type = "button",
  variant: variantProp,
  color = "primary",
  size = "md",
  fullWidth = false,
  icon,
  iconPosition = "left",
  disabled = false,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  onClick,
}: ButtonProps) => {
  const isIconOnly = icon && !children;
  const variant = variantProp ?? (isIconOnly ? "icon" : "default");

  const renderContent = () => {
    if (!icon) {
      return children;
    }

    const iconElement = <Icon name={icon} size={size} />;

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
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      className={button({
        variant,
        color: variant === "icon" && color !== "ghost" ? "none" : color,
        size,
        fullWidth,
      })}
    >
      {renderContent()}
    </button>
  );
};
