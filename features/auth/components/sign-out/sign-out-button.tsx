"use client";
import { Button } from "../../../../core/button";
import { useAppStore } from "../../../app/state";
import { SignOutModal } from "./sign-out-modal";
import { SIGN_OUT_MODAL_ID } from "./sign-out-modal.const";
import type { SignOutButtonProps } from "./sign-out-button.interface";

export const SignOutButton = ({
  label = "Sign out",
  confirmTitle,
  confirmLabel,
  cancelLabel,
  errorMessage,
  onSignOut,
}: SignOutButtonProps) => {
  const openModal = useAppStore((s) => s.openModal);

  const ask = () => {
    openModal(SIGN_OUT_MODAL_ID);
  };

  return (
    <>
      <Button color="ghost" icon="LogOut" aria-label={label} onClick={ask} />
      <SignOutModal
        title={confirmTitle}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        errorMessage={errorMessage}
        onSignOut={onSignOut}
      />
    </>
  );
};
