import type { ButtonProps } from "./button.interface";
import { Icon } from "../icon";
import { button } from "./button.styles";

export const Button = ({
  children,
  type = "button",
  variant: variantProp,
  color = "primary",
  icon,
  iconPosition = "left",
  disabled = false,
  "aria-label": ariaLabel,
  onClick,
}: ButtonProps) => {
  const isIconOnly = icon && !children;
  const variant = variantProp ?? (isIconOnly ? "icon" : "default");

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
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={button({
        variant,
        color: variant === "icon" || variant === "ghost" ? "none" : color,
      })}
    >
      {renderContent()}
    </button>
  );
};
