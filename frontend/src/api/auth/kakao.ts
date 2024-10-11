import {
  ApiError,
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UnknownError,
} from "@/custom-error";

import instance from "../custom-fetch";

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
    const { data } = await instance.post<Response>(
      "/auth/login/oauth/kakao",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          OAuthPermittedCode: oauthPermittedCode,
        },
      },
    );

    return data; // Return the response directly, now already parsed
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.status) {
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
          throw new UnknownError();
      }
    } else {
      throw new UnknownError();
    }
  }
};

export default postOauthPermittedCodeKakao;
