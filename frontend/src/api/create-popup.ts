import { ShowType } from "@/app/add-shows/types";
import { ApiError } from "@/custom-error";

import instance from "./custom-fetch";

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
  popupData: ShowType,
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
