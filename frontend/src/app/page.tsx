// const POPUP_MOCK: Popup = {
//   id: 9,
//   ownerId: 9,
//   title:
//     "코뿔소와 함께하는 잠수교 러닝중 아이스크림이 얼마나 빨리 녹는지 테스트 하기",
//   description: "아메리카노: 빨리 잠들기 대회",
//   location: "강원도 태백시",
//   isParkingAvailable: true,
//   fee: 89000,
//   startDate: "2024-08-02T19:32:19.379718",
//   endDate: "2024-08-02T19:32:19.379718",
//   openTimes: "평일 09:00 ~ 18:00,\n주말 12:00 ~ 21:00\n",
//   latitude: 37.556725,
//   longitude: 126.9234952,
//   publicTag: "예술",
// };

import CarouselUI from "@/components/common/carousel";

const MOCK = ["/images/rhino.webp", "/images/cat.webp", "/images/dog.webp"];

export default function Home() {
  return (
    <>
      <CarouselUI data={MOCK} />
      <div>큐레이션: 인기 팝업</div>
      <div>큐레이션: 추천 팝업</div>
      <div>테마별 팝업 캐러셀</div>
      <div>테마별 팝업 캐러셀</div>
      <div>테마별 팝업 캐러셀</div>
      <div>테마별 팝업 캐러셀</div>
    </>
  );
}
