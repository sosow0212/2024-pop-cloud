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

const koreanBrands = [
  "삼성",
  "현대",
  "LG",
  "SK",
  "롯데",
  "네이버",
  "카카오",
  "쿠팡",
  "CJ",
  "아모레퍼시픽",
  "신세계",
  "이마트",
  "GS",
  "농심",
  "오뚜기",
  "빙그레",
  "해태",
  "SPC",
  "포스코",
  "KT",
  "두산",
  "대한항공",
  "아시아나항공",
  "넥슨",
  "NC소프트",
  "넷마블",
  "카카오뱅크",
  "토스",
];

const characters = [
  "카카오프렌즈",
  "라인프렌즈",
  "BT21",
  "핑크퐁",
  "뽀로로",
  "타요",
  "아기상어",
  "띠부씨",
  "브롤스타즈",
  "포켓몬",
  "헬로키티",
  "짱구",
  "도라에몽",
  "원피스",
  "구름빵",
  "파워퍼프걸",
  "미니언즈",
  "마블",
  "DC",
  "디즈니",
  "산리오",
  "짜장형",
  "펭수",
  "모여봐요 동물의 숲",
];

const desserts = [
  "마카롱",
  "케이크",
  "타르트",
  "쿠키",
  "도넛",
  "아이스크림",
  "빙수",
  "크로플",
  "베이글",
  "뚱카롱",
  "초콜릿",
  "푸딩",
  "젤라또",
  "티라미수",
  "크레이프",
  "와플",
  "츄러스",
  "다쿠아즈",
  "마들렌",
  "에클레어",
  "파르페",
  "브라우니",
  "슈크림",
  "카스테라",
  "롤케이크",
  "두바이 초콜릿",
];

function generateStoreName(tag: string, showType: string): string {
  const brand = koreanBrands[Math.floor(Math.random() * koreanBrands.length)];
  const character = characters[Math.floor(Math.random() * characters.length)];
  const dessert = desserts[Math.floor(Math.random() * desserts.length)];

  const templates = [
    `${brand} x ${character} ${showType}`,
    `${character}와 함께하는 ${brand} ${tag} ${showType}`,
    `${dessert} 맛집 ${brand} ${showType}`,
    `${brand}가 선보이는 ${character} ${dessert} ${showType}`,
    `${character}의 ${dessert} 세계 ${showType}`,
    `${brand} ${tag} ${showType}: ${character} 에디션`,
    `${dessert} 러버를 위한 ${brand} x ${character} ${showType}`,
    `${brand} 프리미엄 ${dessert} ${showType}`,
    `${character}와 ${dessert}의 만남, ${brand} ${showType}`,
    `${brand} 창립 기념 ${character} ${dessert} ${showType}`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

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

    const showType = Math.random() < 0.5 ? "POPUPS" : "EXHIBITION";
    const showTypeText = showType === "POPUPS" ? "팝업" : "전시";
    const publicTag = publicTags[Math.floor(Math.random() * publicTags.length)];

    const title = generateStoreName(publicTag, showTypeText);

    return {
      showId: index + 1,
      showType: showType,
      ownerId: Math.floor(Math.random() * 100) + 1,
      title: title,
      description: `${city.name} ${district}에서 열리는 특별한 ${publicTag} ${showTypeText}입니다. ${title}에서 즐거운 경험을 만나보세요.`,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      openTimes: "평일 11:00 ~ 20:00,\n주말 10:00 ~ 21:00\n",
      location: `${city.name} ${district} ${Math.floor(Math.random() * 100) + 1}번길 ${Math.floor(Math.random() * 100) + 1}`,
      latitude: 33 + Math.random() * 10,
      longitude: 124 + Math.random() * 8,
      isParkingAvailable: Math.random() > 0.5,
      isFoodAllowed: Math.random() > 0.5,
      isPetAllowed: Math.random() > 0.5,
      isKidsZone: Math.random() > 0.5,
      isWifiAvailable: Math.random() > 0.5,
      fee: Math.floor(Math.random() * 20000),
      publicTag: publicTag,
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
