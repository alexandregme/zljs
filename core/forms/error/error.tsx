import type { ErrorProps } from "./error.interface";
import { error } from "./error.styles";

export const Error = ({ id, message }: ErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <span id={id} role="alert" className={error()}>
      {message}
    </span>
  );
};
