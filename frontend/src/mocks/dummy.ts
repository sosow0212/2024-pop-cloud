/*eslint-disable*/
export interface ShowBasic {
  showId: number;
  showType: "POPUPS" | "EXHIBITION";
  publicTag: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  visitedCount: number;
  likedCount: number;
  images: string[];
}

export interface ShowDetail extends ShowBasic {
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
  tags: string[];
}

export const createDummyShows = (count: number): ShowDetail[] => {
  return Array.from({ length: count }, (_, index) => ({
    showId: index + 1,
    showType: Math.random() > 0.5 ? "POPUPS" : "EXHIBITION",
    ownerId: Math.floor(Math.random() * 100) + 1,
    title: `쇼케이스 ${index + 1}`,
    description: `멋진 쇼케이스 ${index + 1}입니다`,
    startDate: "2024-10-03T15:42:11.561806",
    endDate: "2024-12-30T15:52:11.561824",
    openTimes: "평일 09:00 ~ 18:00,\n주말 12:00 ~ 21:00\n",
    location: `서울 마포구 동교동 ${155 + index}`,
    latitude: 37.556725 + (Math.random() - 0.5) * 0.01,
    longitude: 126.9234952 + (Math.random() - 0.5) * 0.01,
    isParkingAvailable: Math.random() > 0.5,
    isFoodAllowed: Math.random() > 0.5,
    isPetAllowed: Math.random() > 0.5,
    isKidsZone: Math.random() > 0.5,
    isWifiAvailable: Math.random() > 0.5,
    fee: Math.floor(Math.random() * 10000),
    publicTag: ["전시", "팝업", "행사"][Math.floor(Math.random() * 3)],
    visitedCount: Math.floor(Math.random() * 1000),
    likedCount: Math.floor(Math.random() * 500),
    tags: ["가족", "데이트", "문화", "예술"]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2),
    images: ["/images/mock.jpeg", "/images/mock2.jpeg", "/images/mock3.jpeg"],
  }));
};
