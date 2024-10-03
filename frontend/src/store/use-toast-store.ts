import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Toast = {
  type: "info" | "success" | "warn" | "danger";
  content: string;
};

interface ToastState {
  toast: Toast | null;
  isOpen: boolean;
}

interface ToastAction {
  setToast: (toast: Toast) => void;
  setIsOpen: (isOpen: boolean) => void;
  showToast: (toast: Toast, duration?: number) => void; // duration은 선택적
}

const useToastStore = create<ToastState & ToastAction>()(
  devtools((set) => ({
    toast: null,
    isOpen: false,
    setToast: (toast: Toast | null) => {
      set({ toast });
    },
    setIsOpen: (isOpen: boolean) => {
      set({ isOpen });
    },
    showToast: (toast: Toast, duration: number = 3000) => {
      set({ toast, isOpen: true });

      setTimeout(() => {
        set({ isOpen: false });
      }, duration); // 기본 3초 후에 자동으로 닫힘
    },
  })),
);

export default useToastStore;
