import { create } from "zustand";

export type ModalType = "login" | "alert";

type ModalDataType = {
  isCheck?: boolean;
};

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
  data: ModalDataType;
}

const useModalStore = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) =>
    set({
      isOpen: true,
      type,
      data,
    }),
  onClose: () =>
    set({
      type: null,
      isOpen: false,
      data: {},
    }),
}));

export default useModalStore;
