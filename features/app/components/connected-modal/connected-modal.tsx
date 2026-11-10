"use client";

import { Modal } from "../../../../core/modal";
import { useAppStore } from "../../state";
import type { ConnectedModalProps } from "./connected-modal.interface";

export const ConnectedModal = ({
  modalId,
  title,
  description,
  size,
  children,
}: ConnectedModalProps) => {
  const open = useAppStore((s) => s.isModalOpen(modalId));
  const closeModal = useAppStore((s) => s.closeModal);

  const close = () => {
    closeModal(modalId);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={title}
      description={description}
      size={size}
    >
      {children}
    </Modal>
  );
};
