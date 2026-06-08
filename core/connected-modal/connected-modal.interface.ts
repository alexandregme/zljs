import type { ReactNode } from "react";
import type { ModalSize } from "../modal";

export interface ConnectedModalProps {
  modalId: string;
  title: string;
  description?: string;
  size?: ModalSize;
  children?: ReactNode;
}
