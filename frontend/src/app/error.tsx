"use client";

import Link from "next/link";
import { BsEmojiTear } from "react-icons/bs";

import { CustomError, UnknownError } from "@/custom-error";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  const message =
    error instanceof CustomError ? error.message : UnknownError.getMessage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <BsEmojiTear className="mb-50 size-130 text-blue-500" />
      <h2 className="mb-20 text-24-600">{`${message} 다시 시도해 주세요.`}</h2>
      <Link
        href="/"
        className="rounded bg-blue-3 px-44 py-12 text-white transition hover:bg-blue-9"
      >
        홈으로
      </Link>
    </div>
  );
}
