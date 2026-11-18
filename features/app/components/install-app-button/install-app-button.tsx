"use client";
import { Button } from "../../../../core/button";
import { useAppStore } from "../../state";
import { ConnectedModal } from "../connected-modal";
import { INSTALL_APP_MODAL_ID } from "./install-app-button.const";
import type { InstallAppButtonProps } from "./install-app-button.interface";

export const InstallAppButton = ({
  way,
  label = "Install app",
  size = "md",
  instructionsTitle = "Install this app",
  instructions = "Tap the Share button of the browser, then Add to Home Screen.",
  onPrompt,
}: InstallAppButtonProps) => {
  const openModal = useAppStore((s) => s.openModal);

  const install = (): void => {
    if (way === "prompt") {
      onPrompt();
    } else {
      openModal(INSTALL_APP_MODAL_ID);
    }
  };

  return (
    <>
      <Button
        color="ghost"
        size={size}
        icon="Download"
        aria-label={label}
        onClick={install}
      />
      {way === "instructions" && (
        <ConnectedModal
          modalId={INSTALL_APP_MODAL_ID}
          title={instructionsTitle}
          description={instructions}
          size="xs"
        />
      )}
    </>
  );
};
