import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ModalState } from "./modal.types";

export const useModalStore = create<ModalState>()(
  devtools(
    (set, get) => ({
      modals: [],
      openModal: (name) =>
        set((s) => ({ modals: [...s.modals, { name }] }), false, "openModal"),
      openModalWithPayload: (name, payload) =>
        set(
          (s) => ({ modals: [...s.modals, { name, payload }] }),
          false,
          "openModalWithPayload",
        ),
      closeModal: (name) =>
        set(
          (s) => ({ modals: s.modals.filter((m) => m.name !== name) }),
          false,
          "closeModal",
        ),
      isOpen: (name) => get().modals.some((m) => m.name === name),
      getPayload: (name) => get().modals.find((m) => m.name === name)?.payload,
    }),
    { name: "zljs", store: "modal" },
  ),
);
