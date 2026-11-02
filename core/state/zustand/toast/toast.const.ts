import type { ToastState } from "./toast.interface";

export const toastInitialState: Pick<ToastState, "toasts"> = {
  toasts: [],
};

export const toastDevtools = { name: "zljs", store: "toast" };
