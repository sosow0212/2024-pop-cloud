"use client";

import React, { useEffect } from "react";

import postOauthPermittedCodeKakao from "@/api/auth/kakao";
import { BadRequestError } from "@/custom-error/api-error";
import { setCookie } from "@/utils/cookie";

export default function GetKakaoToken() {
  useEffect(() => {
    const getToken = async () => {
      const url = new URL(window.location.href);
      const oauthPermittedCode = url.searchParams.get("code");
      if (!oauthPermittedCode) {
        throw new BadRequestError("인가 코드를 받지 못했습니다.");
      }
      const res = await postOauthPermittedCodeKakao(oauthPermittedCode);

      await setCookie("accessToken", res.accessToken);
    };

    getToken();
  }, []);
  return <div className="animate-pulse bg-text-default">로그인 중</div>;
}
