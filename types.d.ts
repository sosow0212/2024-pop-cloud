interface IPopupInfo {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  location: string;
  isParkingAvailable: boolean;
  fee: number;
  startDate: Date;
  endDate: Date;
  openTimes: string;
  latitude: number;
  longitude: number;
  publicTag: string;
}

type ISearchDate = {
  startDate: Date;
  endDate: Date;
};

type IPublicTag =
  | "브랜드"
  | "패션"
  | "뷰티"
  | "음식"
  | "홈"
  | "완구류"
  | "레저"
  | "서적"
  | "음악"
  | "펫"
  | "운동"
  | "디지털"
  | "예술"
  | "캐릭터"
  | "굿즈"
  | "전시"
  | "기타";

type ISearchRegion =
  | "전체"
  | "서울특별시"
  | "경기도"
  | "인천광역시"
  | "강원도"
  | "부산광역시"
  | "대전광역시";
