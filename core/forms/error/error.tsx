import type { ErrorProps } from "./error.interface";
import { error } from "./error.styles";

export const Error = ({ message }: ErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <span role="alert" className={error()}>
      {message}
    </span>
  );
};
