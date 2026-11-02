import type { ModalState } from "./modal.interface";

export const modalInitialState: Pick<ModalState, "modals"> = {
  modals: [],
};

export const modalDevtools = { name: "zljs", store: "modal" };
