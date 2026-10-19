import type { IconName } from "../icon/icon.interface";
import type { SpinnerVariant } from "./spinner.interface";

export const spinnerIcons: Record<SpinnerVariant, IconName> = {
  circle: "LoaderCircle",
  dots: "Loader",
  refresh: "RefreshCw",
};
