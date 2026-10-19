import type { SpinnerProps } from "./spinner.interface";
import { Icon } from "../icon";
import { spinnerIcons } from "./spinner.const";
import { spinner } from "./spinner.styles";

export const Spinner = ({ variant = "circle", size = "md" }: SpinnerProps) => (
  <span data-testid="spinner" className={spinner()}>
    <Icon name={spinnerIcons[variant]} size={size} />
  </span>
);
