import type { SpinnerProps } from "./spinner.interface";
import { Icon } from "../icon";
import { spinnerIcons } from "./spinner.const";
import { spinner } from "./spinner.styles";

export const Spinner = ({
  variant = "circle",
  size = "md",
  label = "Loading",
}: SpinnerProps) => (
  <span
    data-testid="spinner"
    role="status"
    aria-label={label}
    className={spinner()}
  >
    <Icon name={spinnerIcons[variant]} size={size} />
  </span>
);
