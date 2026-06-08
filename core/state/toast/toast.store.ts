import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ToastState } from "./toast.types";

let toastId = 0;

export const useToastStore = create<ToastState>()(
  devtools(
    (set, get) => ({
      toasts: [],
      addToast: (message, type = "error") => {
        const id = ++toastId;
        set(
          (s) => ({ toasts: [...s.toasts, { id, message, type }] }),
          false,
          "addToast",
        );
        return id;
      },
      removeToast: (id) =>
        set(
          (s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }),
          false,
          "removeToast",
        ),
      success: (message) => get().addToast(message, "success"),
      error: (message) => get().addToast(message, "error"),
      info: (message) => get().addToast(message, "info"),
      warning: (message) => get().addToast(message, "warning"),
    }),
    { name: "zljs", store: "toast" },
  ),
);
