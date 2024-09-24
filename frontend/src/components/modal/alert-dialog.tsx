import { useModalStore } from "@/store";

import { DialogContainer } from "./modal-container";

export default function AlertDialog() {
  const { isOpen, onClose, type } = useModalStore();
  const isModalOpen = isOpen && type === "alert";
  if (!isModalOpen) return null;

  return (
    <DialogContainer isOpen={isModalOpen} onClose={onClose}>
      <div className="flex justify-center gap-x-2">
        <button className="rounded-md border px-20 py-4" type="button">
          확인
        </button>
        <button
          className="rounded-md border bg-red-400 px-20 py-4"
          type="button"
        >
          취소
        </button>
      </div>
    </DialogContainer>
  );
}
