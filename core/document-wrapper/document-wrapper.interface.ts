import type { ReactNode } from "react";

export interface DocumentWrapperProps {
  children: ReactNode;
  lang?: string;
  className?: string;
}
