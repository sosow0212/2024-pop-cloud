export interface ShowType {
  // 기본 정보
  title: string; // 팝업스토어 제목
  description: string; // 설명

  // 일정 관련
  startDate: string; // 시작 날짜 (ISO 8601 형식)
  endDate: string; // 종료 날짜 (ISO 8601 형식)
  openTimes: string; // 영업 시간

  // 위치 정보
  location: string; // 주소
  latitude: string; // 위도
  longitude: string; // 경도

  // 편의시설 정보
  isParkingAvailable?: boolean; // 주차 가능 여부
  isFoodAllowed?: boolean; // 음식물 반입 가능 여부
  isPetAllowed?: boolean; // 반려동물 동반 가능 여부
  isKidsZone?: boolean; // 키즈존 유무
  isWifiAvailable?: boolean; // 와이파이 사용 가능 여부

  // 요금 및 태그
  fee?: number; // 입장료
  publicTag: string; // 대표 태그
  tags?: string[]; // 태그 목록
}
