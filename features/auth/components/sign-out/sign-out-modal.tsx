"use client";
import { Button } from "../../../../core/button";
import { ConnectedModal } from "../../../app/components/connected-modal";
import { useAppStore } from "../../../app/state";
import { useToastStore } from "../../../toaster/state";
import { useAuth } from "../../hooks/use-auth";
import { SIGN_OUT_MODAL_ID } from "./sign-out-modal.const";
import type { SignOutModalProps } from "./sign-out-modal.interface";
import { signOutModal } from "./sign-out-modal.styles";

export const SignOutModal = ({
  title = "Sign out?",
  confirmLabel = "Sign out",
  cancelLabel = "Cancel",
  errorMessage = "Could not sign out. Try again.",
}: SignOutModalProps) => {
  const { signOut } = useAuth();
  const closeModal = useAppStore((s) => s.closeModal);
  const { actions } = signOutModal();

  const stay = () => {
    closeModal(SIGN_OUT_MODAL_ID);
  };

  const leave = () => {
    closeModal(SIGN_OUT_MODAL_ID);
    signOut().catch(() => {
      useToastStore.getState().error(errorMessage);
    });
  };

  return (
    <ConnectedModal
      modalId={SIGN_OUT_MODAL_ID}
      title={title}
      size="xs"
      color="danger"
    >
      <div className={actions()}>
        <Button color="ghost" onClick={stay}>
          {cancelLabel}
        </Button>
        <Button color="danger" onClick={leave}>
          {confirmLabel}
        </Button>
      </div>
    </ConnectedModal>
  );
};
