"use client";
import { useEffect } from "react";
import { Toaster as SonnerToaster, toast } from "sonner";
import { useToastStore } from "../state/zustand/toast";
import { toaster, toasterColors } from "./toaster.styles";

export const Toaster = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);
  const { toast: toastStyles, closeButton } = toaster();

  useEffect(() => {
    toasts.forEach((t) => {
      // Sonner numbers its own toasts from 1 too, so a number could replace one.
      toast[t.type](t.message, { id: `store-${t.id}` });
      removeToast(t.id);
    });
  }, [toasts, removeToast]);

  return (
    <SonnerToaster
      position="bottom-right"
      richColors
      closeButton
      duration={4000}
      expand
      visibleToasts={5}
      style={toasterColors}
      toastOptions={{
        classNames: { toast: toastStyles(), closeButton: closeButton() },
      }}
    />
  );
};
