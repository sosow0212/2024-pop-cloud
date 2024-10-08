import {
  ApiError,
  BadRequestError,
  CustomError,
  ForbiddenError,
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
  UnknownError,
} from "@/custom-error";

interface Response {
  accessToken: string;
}

type ApiType = (oauthPermittedCode: string) => Promise<Response>;

/**
 * 카카오에서 받은 인가 코드로 토큰을 요청합니다
 * @param {string} oauthPermittedCode 카카오에서 받은 인가 코드
 */

const postOauthPermittedCodeKakao: ApiType = async (oauthPermittedCode) => {
  try {
    const response = await fetch("/auth/login/oauth/kakao", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        OAuthPermittedCode: oauthPermittedCode,
      },
    });

    // 네트워크 오류 확인
    if (!response) {
      throw new NetworkError();
    }

    // HTTP 상태 코드에 따른 오류 처리
    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new BadRequestError("잘못된 인가 코드입니다."); // 잘못된 요청
        case 401:
          throw new UnauthorizedError(); // 인증 실패
        case 403:
          throw new ForbiddenError(); // 권한 없음
        case 404:
          throw new NotFoundError(); // 경로 없음
        case 500:
          throw new InternalServerError(); // 서버 에러
        default:
          throw new ApiError(
            `요청에 실패했습니다: ${response.statusText}`,
            response.status,
          );
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      throw new UnknownError();
    }
  }
};

export default postOauthPermittedCodeKakao;
