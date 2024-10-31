import { ApiError } from "@/custom-error";

import instance from "./custom-fetch";

export interface CreatePopupRequest {
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

interface CreatePopupResponse {
  status: number;
  message: string;
  data: {
    id: number;
  };
}

/**
 * 팝업스토어를 생성하는 API 함수입니다.
 */
const createPopup = async (
  popupData: CreatePopupRequest,
): Promise<CreatePopupResponse> => {
  try {
    const accessToken = await instance.getAccessToken();
    const { data } = await instance.post<CreatePopupResponse>(
      "/api/popups",
      popupData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 이 부분을 체크
        },
      },
    );

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 400:
          throw new ApiError("필수 정보가 누락되었습니다.", 400);
        case 401:
          throw new ApiError("인증이 필요합니다.", 401);
        case 403:
          throw new ApiError("권한이 없습니다.", 403);
        case 500:
          throw new ApiError("서버 에러가 발생했습니다.", 500);
        default:
          throw new ApiError("알 수 없는 에러가 발생했습니다.", error.status);
      }
    }
    throw error;
  }
};

export default createPopup;
