import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal-store";

export default function AlertDialog() {
  const { isOpen, onClose, type, data } = useModalStore();
  const isModalOpen = isOpen && type === "alert";
  if (!isModalOpen) return null;

  // const handleClick = (isTrue: boolean) => {
  //   console.log(isTrue);
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{data.headerTitle}</DialogTitle>
          <DialogDescription>
            <div className="flex justify-center gap-x-2">
              <button className="rounded-md border px-20 py-4  " type="button">
                확인
              </button>
              <button
                className="rounded-md  border bg-red-400  px-20 py-4  "
                type="button"
              >
                취소
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
