import * as Dialog from "@radix-ui/react-dialog";
import type { ModalProps } from "./modal.interface";
import { Button } from "../button";
import {
  overlay,
  content,
  header,
  title as titleStyle,
  description as descriptionStyle,
  body,
} from "./modal.styles";

export const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlay()} />
        <Dialog.Content
          className={content()}
          {...(!description && { "aria-describedby": undefined })}
        >
          <div className={header()}>
            <Dialog.Title className={titleStyle()}>{title}</Dialog.Title>
            <Button icon="BiX" aria-label="Close" onClick={onClose} />
          </div>
          {description && (
            <Dialog.Description className={descriptionStyle()}>
              {description}
            </Dialog.Description>
          )}
          {children && <div className={body()}>{children}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
