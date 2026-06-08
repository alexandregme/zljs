"use client";
import { useEffect } from "react";
import { Toaster as SonnerToaster, toast } from "sonner";
import { useToastStore } from "../state/toast";

export const Toaster = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  useEffect(() => {
    toasts.forEach((t) => {
      toast[t.type](t.message, {
        id: t.id,
        onDismiss: () => removeToast(t.id),
      });
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
    />
  );
};
