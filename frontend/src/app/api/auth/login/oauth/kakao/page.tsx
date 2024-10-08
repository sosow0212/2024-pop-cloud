"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import postOauthPermittedCodeKakao from "@/api/auth/kakao";
import { CustomError, UnknownError } from "@/custom-error";
import { BadRequestError } from "@/custom-error/api-error";
import { setCookie } from "@/utils/cookie";

export default function GetKakaoToken() {
  const [message, setMessage] = useState<string>("로그인 중입니다");
  const [failed, setFailed] = useState<boolean>(false);
  useEffect(() => {
    const getToken = async () => {
      try {
        const url = new URL(window.location.href);
        const oauthPermittedCode = url.searchParams.get("code");
        if (!oauthPermittedCode) {
          throw new BadRequestError("인가 코드를 받지 못했습니다.");
        }
        const res = await postOauthPermittedCodeKakao(oauthPermittedCode);

        await setCookie("accessToken", res.accessToken);
      } catch (error) {
        setFailed(true);
        if (error instanceof CustomError) {
          setMessage(`${error.message} 다시 시도해 주세요`);
        } else {
          setMessage(UnknownError.getMessage());
        }
      }
    };

    getToken();
  }, []);
  return (
    <div>
      <span>{message}</span>
      {failed && <Link href="/">홈으로</Link>}
    </div>
  );
}
