import React from "react";

/**
 * 파란색 네모가 돌아갑니다.
 * className을 줄 수 있습니다.
 * 사이즈를 줘야 합니다.
 * @example <SquareSpinner className="size-100" />
 * @author 채종민
 */

export default function SquareSpinner({ className }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-5 border-[3px] border-blue-6 ${className}`}
    />
  );
}
