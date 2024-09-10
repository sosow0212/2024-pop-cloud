import { create, createStore } from "zustand";

type IModal = null | "auth" | "map";

interface ModalStoreProps {
  modal: IModal;
  isOpen: boolean;
  onOpen: (modal: IModal) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStoreProps>((set) => ({
  isOpen: false,
  modal: null,
  onOpen: (modal) =>
    set(() => ({
      modal,
      isOpen: true,
    })),
  onClose: () =>
    set(() => ({
      isOpen: false,
      modal: null,
    })),
}));
