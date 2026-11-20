"use client";
import { Button } from "../../../../core/button";
import { useToastStore } from "../../../toaster/state";
import { SHARE_APP_CANCELLED } from "./share-app-button.const";
import type { ShareAppButtonProps } from "./share-app-button.interface";

export const ShareAppButton = ({
  label,
  iconOnly = false,
  size = "md",
  title,
  text,
  copiedMessage = "Link copied",
  errorMessage = "Could not share the link",
}: ShareAppButtonProps) => {
  const copy = async (address: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(address);
      useToastStore.getState().success(copiedMessage);
    } catch {
      // No clipboard on a page without https, or the browser refused.
      useToastStore.getState().error(errorMessage);
    }
  };

  const shareOrCopy = async (): Promise<void> => {
    // The app itself, whatever page the user is on. Read on the click: the
    // server has no page to read it from.
    const address = window.location.origin;

    // A phone has a share dialog. A browser without one copies the address.
    if (typeof navigator.share !== "function") {
      await copy(address);
      return;
    }

    try {
      await navigator.share({
        title: title ?? document.title,
        text,
        url: address,
      });
    } catch (reason) {
      // The user closed the dialog: there is nothing to tell.
      if ((reason as Error).name !== SHARE_APP_CANCELLED) {
        await copy(address);
      }
    }
  };

  const share = (): void => {
    void shareOrCopy();
  };

  return (
    <Button
      color="ghost"
      size={size}
      icon="Share2"
      aria-label={iconOnly ? label : undefined}
      onClick={share}
    >
      {!iconOnly && label}
    </Button>
  );
};
