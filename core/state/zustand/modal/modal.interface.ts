export interface ModalEntry {
  name: string;
  payload?: unknown;
}

export interface ModalState {
  modals: ModalEntry[];
  openModal: (name: string) => void;
  openModalWithPayload: (name: string, payload: unknown) => void;
  closeModal: (name: string) => void;
  isOpen: (name: string) => boolean;
  getPayload: (name: string) => unknown | undefined;
}
