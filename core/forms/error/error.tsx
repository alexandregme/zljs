import type { ErrorProps } from "./error.interface";

export const Error = ({ message }: ErrorProps) => {
  if (!message) {
    return null;
  }

  return <span role="alert">{message}</span>;
};
