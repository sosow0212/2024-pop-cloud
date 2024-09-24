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

const mock = ["/images/mock.jpeg", "/images/mock2.jpeg", "/images/mock3.jpeg"];

interface CarouselProps {
  link?: boolean;
  autoPlay?: boolean;
  indicators?: boolean;
  className?: string;
}

/**
 * 기본적으로 모두 false 처리 했습니다. 사용하고 싶을 때 true로 변경해주세요.
 * @param link 링크를 사용하고 싶을 때
 * @param autoPlay 자동 재생을 사용하고 싶을 때
 * @param indicators 인디케이터를 추가하고 싶을 때
 * @param className 캐러셀 컨테이너에 적용할 추가 클래스 (크기를 지정해주세요)
 */
export default function CarouselUI({
  link = false,
  autoPlay = false,
  indicators = false,
  className = "w-full h-200",
}: CarouselProps) {
  return (
    <Carousel autoplay={autoPlay} className={`${className} m-auto`}>
      <CarouselContent>
        {mock.map((carouselItem, index) => (
          <CarouselItem key={carouselItem} className={`${className}`}>
            {link ? (
              <Link href="/" className="block size-full">
                <Image
                  src={carouselItem}
                  alt={`사진 ${index + 1}`}
                  fill
                  className="!relative size-full object-cover"
                />
              </Link>
            ) : (
              <Image
                src={carouselItem}
                alt={`사진 ${index + 1}`}
                fill
                className="!relative size-full object-cover"
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

// mock 은 나중에 imageData로 교체될 예정입니다.
// key값의 index도 교체 예정입니다.
// 링크의 주소도 나중에 데이터 받을 때 처리예정
// 샤드시엔 캐러셀 컴포넌트에 인디케이터 / 무한캐러셀 / 자동재생 로직 추가했습니다.
// 자동재생 속도는 5초가 적당해보여서 했는데, 너무 빠르거나 느리면 알려주세요.
// (현재 컴포넌트에 하면 중복되는 로직이 많아서 어쩔 수 없었음)
