/*eslint-disable*/

export interface PopupBasic {
  id: number;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  visitedCount: number;
  likedCount: number;
  image: any;
}

export interface PopupDetail extends PopupBasic {
  ownerId: number;
  description: string;
  openTimes: string;
  latitude: number;
  longitude: number;
  isParkingAvailable: boolean;
  isFoodAllowed: boolean;
  isPetAllowed: boolean;
  isKidsZone: boolean;
  isWifiAvailable: boolean;
  fee: number;
  publicTag: string;
  tags: string[];
}

export const createDummyPopups = (count: number): PopupDetail[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    ownerId: Math.floor(Math.random() * 100) + 1,
    title: `팝업이 팝업스토어 ${index + 1}`,
    description: `팝업이와 함께하는 팝업스토어 ${index + 1}`,
    startDate: "2024-09-01T18:55:36.052679",
    endDate: "2024-09-01T19:55:36.052725",
    image: "/images/luffi.jpg",
    openTimes: "월 09:00 - 18:00,\n화 12:00 - 21:00\n",
    location: `서울 마포구 월드컵북로 ${155 + index}`,
    latitude: 37.556725 + (Math.random() - 0.5) * 0.01,
    longitude: 126.923495 + (Math.random() - 0.5) * 0.01,
    isParkingAvailable: Math.random() > 0.5,
    isFoodAllowed: Math.random() > 0.5,
    isPetAllowed: Math.random() > 0.5,
    isKidsZone: Math.random() > 0.5,
    isWifiAvailable: Math.random() > 0.5,
    fee: Math.floor(Math.random() * 10000),
    publicTag: ["인기", "신규", "추천"][Math.floor(Math.random() * 3)],
    visitedCount: Math.floor(Math.random() * 1000),
    likedCount: Math.floor(Math.random() * 500),
    tags: ["가족", "데이트", "문화", "예술"]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2),
  }));
};
