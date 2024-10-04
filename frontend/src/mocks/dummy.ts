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

const cities = [
  {
    name: "서울",
    districts: ["강남구", "서초구", "마포구", "종로구", "성동구"],
  },
  {
    name: "부산",
    districts: ["해운대구", "수영구", "부산진구", "동래구", "남구"],
  },
  { name: "대구", districts: ["중구", "수성구", "달서구", "동구", "북구"] },
  {
    name: "인천",
    districts: ["미추홀구", "연수구", "남동구", "부평구", "계양구"],
  },
  { name: "광주", districts: ["동구", "서구", "남구", "북구", "광산구"] },
  { name: "대전", districts: ["동구", "중구", "서구", "유성구", "대덕구"] },
  { name: "울산", districts: ["중구", "남구", "동구", "북구", "울주군"] },
  {
    name: "경기",
    districts: ["수원시", "성남시", "용인시", "고양시", "부천시"],
  },
];

const publicTags = [
  "전시",
  "패션",
  "뷰티",
  "음식",
  "홈",
  "완구류",
  "레저",
  "서적",
  "음악",
  "펫",
  "운동",
  "디지털",
  "예술",
  "캐릭터",
  "굿즈",
];
const additionalTags = [
  "가족",
  "데이트",
  "문화",
  "예술",
  "체험",
  "교육",
  "힐링",
  "쇼핑",
  "SNS",
  "인생샷",
  "트렌드",
  "혁신",
  "전통",
  "미래",
  "친환경",
];

export const createDummyShows = (count: number): ShowDetail[] => {
  return Array.from({ length: count }, (_, index) => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const district =
      city.districts[Math.floor(Math.random() * city.districts.length)];
    const startDate = new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    );
    const endDate = new Date(
      startDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000,
    );

    return {
      showId: index + 1,
      showType: Math.random() > 0.5 ? "POPUPS" : "EXHIBITION",
      ownerId: Math.floor(Math.random() * 100) + 1,
      title: `${city.name} ${publicTags[Math.floor(Math.random() * publicTags.length)]} 쇼케이스 ${index + 1}`,
      description: `${city.name} ${district}에서 열리는 멋진 ${publicTags[Math.floor(Math.random() * publicTags.length)]} 쇼케이스입니다.`,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      openTimes: "평일 09:00 ~ 18:00,\n주말 12:00 ~ 21:00\n",
      location: `${city.name} ${district} ${Math.floor(Math.random() * 100) + 1}번길 ${Math.floor(Math.random() * 100) + 1}`,
      latitude: 33 + Math.random() * 10,
      longitude: 124 + Math.random() * 8,
      isParkingAvailable: Math.random() > 0.5,
      isFoodAllowed: Math.random() > 0.5,
      isPetAllowed: Math.random() > 0.5,
      isKidsZone: Math.random() > 0.5,
      isWifiAvailable: Math.random() > 0.5,
      fee: Math.floor(Math.random() * 20000),
      publicTag: publicTags[Math.floor(Math.random() * publicTags.length)],
      visitedCount: Math.floor(Math.random() * 10000),
      likedCount: Math.floor(Math.random() * 5000),
      tags: Array.from(
        new Set(
          [...additionalTags]
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 5) + 1),
        ),
      ),
      images: ["/images/mock.jpeg", "/images/mock2.jpeg", "/images/mock3.jpeg"],
    };
  });
};
