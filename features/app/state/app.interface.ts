export interface AppState {
  fetchingCalls: number;
  fetching: boolean;
  /**
   * The modals open now: each key is the id of a modal, unique in the app, and
   * its value is the payload it was opened with. `ConnectedModal` shows the
   * one with its `modalId`.
   */
  modals: Record<string, unknown>;
  startFetching: () => void;
  finishFetching: () => void;
  openModal: (id: string) => void;
  openModalWithPayload: (id: string, payload: unknown) => void;
  closeModal: (id: string) => void;
  isModalOpen: (id: string) => boolean;
  getModalPayload: (id: string) => unknown | undefined;
}
