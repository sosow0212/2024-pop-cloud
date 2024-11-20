"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import postOauthPermittedCodeKakao from "@/api/auth/kakao";
import Error from "@/app/error";
import SquareSpinner from "@/components/common/loading/square-spinner";
import { CustomError, UnknownError } from "@/custom-error";
import { BadRequestError } from "@/custom-error/api-error";
import { setCookie } from "@/utils/next-cookie";

export default function GetKakaoToken() {
  const [error, setError] = useState<Error>();
  const router = useRouter();
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
        router.push("/");
      } catch (err) {
        if (err instanceof CustomError) {
          setError(err);
        } else {
          const newError = new UnknownError();
          setError(newError);
        }
      }
    };

    getToken();
  }, [router]);
  return (
    <div>
      {error ? (
        <Error error={error} />
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-90 text-center">
          <SquareSpinner className="size-100" />
        </div>
      )}
    </div>
  );
}
