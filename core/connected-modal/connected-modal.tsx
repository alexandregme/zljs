"use client";

import { Modal } from "../modal";
import { useModalStore } from "../state/modal";
import type { ConnectedModalProps } from "./connected-modal.interface";

export const ConnectedModal = ({
  modalId,
  title,
  description,
  size,
  children,
}: ConnectedModalProps) => {
  const isOpen = useModalStore((s) => s.isOpen(modalId));
  const closeModal = useModalStore((s) => s.closeModal);

  return (
    <Modal
      open={isOpen}
      onClose={() => closeModal(modalId)}
      title={title}
      description={description}
      size={size}
    >
      {children}
    </Modal>
  );
};
