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
  onSignOut,
}: SignOutModalProps) => {
  const { signOut } = useAuth();
  const closeModal = useAppStore((s) => s.closeModal);
  const { actions } = signOutModal();

  const stay = () => {
    closeModal(SIGN_OUT_MODAL_ID);
  };

  // The app's own function when it passed one, or else the adapter of
  // `AuthProvider`. It is async so a function that throws fails the same way
  // as one that rejects.
  const signOutOfApp = async (): Promise<void> => {
    if (onSignOut) {
      await onSignOut();
    } else {
      await signOut();
    }
  };

  const showError = (): void => {
    useToastStore.getState().error(errorMessage);
  };

  const leave = () => {
    closeModal(SIGN_OUT_MODAL_ID);
    signOutOfApp().catch(showError);
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
