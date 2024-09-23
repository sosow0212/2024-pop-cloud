import { create } from "zustand";

/**
 * 현재 화면 크기가 모바일인지 boolean 값을 가지고 있는 전역 변수입니다.
 *
 * 모바일인지 알고 싶을 때 사용합니다.
 *
 * @example
 *  //trigger 요소 클릭 이벤트
 * const {onOpen} = useIsMobileStore();
 * const handleClick = () => onOpen("login")
 *
 *  //modal 생성
 * const {isOpen, type,onClose} = useModalStore()
 * const isModalOpen = isOpen && type==="login"
 * modal props의 isOpen={isModalOpen} onClose={onClose} 를 넣어주시면 됩니다
 *
 * @author 위영진
 */
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
