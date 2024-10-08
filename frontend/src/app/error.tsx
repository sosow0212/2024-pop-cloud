"use client";

import Link from "next/link";

import { CustomError, UnknownError } from "@/custom-error";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  const message =
    error instanceof CustomError ? error.message : UnknownError.getMessage();

  return (
    <div>
      <h2>{`${message} 다시 시도해 주세요`}</h2>
      <Link href="/">홈으로</Link>
    </div>
  );
}
