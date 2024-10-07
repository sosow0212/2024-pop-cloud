import CarouselUI from "@/components/common/carousel";
import Slide from "@/components/common/popup-slide";
import POPUPS_MOCK from "@/components/common/popup-slide/mockData";

export default function Home() {
  // todo 페칭코드 작성 후 삭제
  const images = [
    "/images/mock.jpeg",
    "/images/mock2.jpeg",
    "/images/mock3.jpeg",
  ];
  return (
    <>
      <div>
        <CarouselUI data={images} />
      </div>
      {/* todo 사이드바 수정되는 대로 레이아웃 마진 조정.. */}
      <div className="mx-auto h-500 overflow-hidden md:p-40 lg:w-1200">
        <Slide popups={POPUPS_MOCK} />
      </div>
    </>
  );
}
