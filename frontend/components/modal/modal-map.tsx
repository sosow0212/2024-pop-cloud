import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/lib/store";
import DaumPostcode from "react-daum-postcode";

const ModalMap = () => {
  const { isOpen, modal, onClose } = useModalStore();

  const getPosition = async (address: string) => {
    const url = `https://dapi.kakao.com/v2/local/search/address?query=${address}`;
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `KakaoAK 1432074184dbae7921bf91c6c23969e9`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const { x: longitude, y: latitude } = data.documents[0];

        return { latitude, longitude };
      }
      throw new Error("somethis is wrong");
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async (result: any) => {
    try {
      const { address, zonecode } = result;
      const position = await getPosition(address);
      if (position) {
        const { latitude, longitude } = position;
        sessionStorage.setItem(
          process.env.NEXT_PUBLIC_POST_ADDRESS!,
          JSON.stringify({
            address,
            zonecode,
            latitude,
            longitude,
          }),
        );
        onClose();
      } else {
        throw new Error("Something is wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isOpen && modal === "map")
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[70vh] max-w-lg">
          <DialogHeader className="">
            <DialogTitle className="text-[1.75rem]">주소 검색</DialogTitle>
            <DialogDescription>도로명이나 지번 입력</DialogDescription>
            <div className="border px-2 py-1">
              <DaumPostcode onComplete={handleComplete} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
};

export default ModalMap;
