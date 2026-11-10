import type { ReactNode } from "react";
import type { ModalSize } from "../../../../core/modal";

export interface ConnectedModalProps {
  /** The id of the modal in `useAppStore`, unique in the app: `openModal(modalId)` shows it. */
  modalId: string;
  title: string;
  description?: string;
  size?: ModalSize;
  children?: ReactNode;
}
