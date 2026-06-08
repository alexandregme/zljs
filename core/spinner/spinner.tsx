import { LoaderCircle } from "lucide-react";
import type { SpinnerProps } from "./spinner.interface";
import { spinner } from "./spinner.styles";

export const Spinner = ({ className }: SpinnerProps) => (
  <LoaderCircle className={spinner({ className })} strokeWidth={1} />
);
