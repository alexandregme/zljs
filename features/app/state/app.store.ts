import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { appDevtools, appInitialState } from "./app.const";
import type { AppState } from "./app.interface";

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      ...appInitialState,
      startFetching: () =>
        set(
          (s) => {
            const fetchingCalls = s.fetchingCalls + 1;
            return { fetchingCalls, fetching: true };
          },
          false,
          "startFetching",
        ),
      finishFetching: () =>
        set(
          (s) => {
            const fetchingCalls = Math.max(0, s.fetchingCalls - 1);
            return { fetchingCalls, fetching: fetchingCalls > 0 };
          },
          false,
          "finishFetching",
        ),
      openModal: (id) =>
        set(
          (s) => ({ modals: { ...s.modals, [id]: undefined } }),
          false,
          "openModal",
        ),
      openModalWithPayload: (id, payload) =>
        set(
          (s) => ({ modals: { ...s.modals, [id]: payload } }),
          false,
          "openModalWithPayload",
        ),
      closeModal: (id) =>
        set(
          (s) => {
            const modals = { ...s.modals };
            delete modals[id];
            return { modals };
          },
          false,
          "closeModal",
        ),
      isModalOpen: (id) => Object.keys(get().modals).includes(id),
      getModalPayload: (id) => get().modals[id],
    }),
    appDevtools,
  ),
);
