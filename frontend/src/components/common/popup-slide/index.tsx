import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import PopupCard, { Popup } from "../popup-card";

interface SlideProps {
  popups: Popup[];
  autoPlay?: boolean;
  className?: string;
}

export default function Slide({
  popups,
  autoPlay = true,
  className = "",
}: SlideProps) {
  return (
    <Carousel autoplay={autoPlay} className={`${className} relative w-full`}>
      <CarouselContent className="my-20 w-full">
        {popups.map((popup) => (
          <CarouselItem
            key={popup.id}
            className={`${className} md:basis-2/5 lg:basis-2/6`}
          >
            {/* todo href 속성 팝업 id 파라미터 이용해서 상세페이지로 연결 */}
            <Link href="/">
              <PopupCard popup={popup} className="mx-auto" />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-40" />
      <CarouselNext className="absolute -right-40 rounded-full hover:bg-gray-200" />
      <CarouselIndicators />
    </Carousel>
  );
}
