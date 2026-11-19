"use client";
import { toast as sonnerToast, type ExternalToast } from "sonner";
import { ToasterCopyButton } from "./toaster-copy-button";

type ShowToast = typeof sonnerToast.error;

const copyText = (
  message: string,
  description: ExternalToast["description"],
) => (typeof description === "string" ? `${message}\n${description}` : message);

// An error or warning in text gets a button that copies it, so the user can
// send it to whoever fixes it. An `action` passed by the app replaces it.
const withCopy =
  (show: ShowToast): ShowToast =>
  (message, data) =>
    show(
      message,
      typeof message === "string"
        ? {
            action: (
              <ToasterCopyButton text={copyText(message, data?.description)} />
            ),
            ...data,
          }
        : data,
    );

export const toast: typeof sonnerToast = Object.assign(
  (...args: Parameters<typeof sonnerToast>) => sonnerToast(...args),
  sonnerToast,
  {
    error: withCopy(sonnerToast.error),
    warning: withCopy(sonnerToast.warning),
  },
);
