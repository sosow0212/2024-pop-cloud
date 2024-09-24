import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface CarouselProps {
  link?: boolean;
  autoPlay?: boolean;
  indicators?: boolean;
  className?: string;
  data: string[];
}

/**
 * 기본적으로 모두 true 처리 했습니다. 사용하고 싶을 때 true로 변경해주세요.
 *
 * @param link 링크를 사용하고 싶을 때
 * @param autoPlay 자동 재생을 사용하고 싶을 때
 * @param indicators 인디케이터를 추가하고 싶을 때
 * @param className 캐러셀 컨테이너에 적용할 추가 클래스 (크기를 지정해주세요)
 * @param data 이미지 데이터입니다.
 *
 * @author 조현지
 */

export default function CarouselUI({
  link = true,
  autoPlay = true,
  indicators = true,
  className = "w-full h-300",
  data,
}: CarouselProps) {
  return (
    <Carousel autoplay={autoPlay} className={`${className} m-auto`}>
      <CarouselContent>
        {data.map((carouselItem, index) => (
          <CarouselItem
            key={carouselItem}
            className={`${className} relative block`}
          >
            {link ? (
              <Link href="/" className="size-full">
                <Image
                  src={carouselItem}
                  alt={`사진 ${index + 1}`}
                  fill
                  className="size-full object-cover"
                />
              </Link>
            ) : (
              <Image
                src={carouselItem}
                alt={`사진 ${index + 1}`}
                fill
                className="size-full object-cover"
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-8" />
      <CarouselNext className="absolute -right-8" />
      {indicators && <CarouselIndicators />}
    </Carousel>
  );
}
