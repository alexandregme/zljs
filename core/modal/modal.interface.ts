import type { ReactNode } from "react";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  /** The width. `xs` is the smallest, for a short question and its buttons. */
  size?: ModalSize;
}
