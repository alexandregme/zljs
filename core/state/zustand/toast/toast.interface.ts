export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => number;
  removeToast: (id: number) => void;
  success: (message: string) => number;
  error: (message: string) => number;
  info: (message: string) => number;
  warning: (message: string) => number;
}
