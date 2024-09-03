import Link from "next/link";
import { RefObject, useEffect, useState } from "react";

interface ContentCardProps {
  categoryType: "popup" | "exhibition";
  cardId: number | string;
}

const ContentCard = ({ cardId, categoryType = "popup" }: ContentCardProps) => {
  return (
    <div className="flex flex-col">
      <Link href={`/category/${categoryType}/${cardId}`}>
        <div className="h-40 w-full rounded-md bg-black text-white">
          {cardId}
        </div>
      </Link>
      <div className="flex flex-col items-start justify-center">
        {/* 이미지 hover 시 description 표시 */}
        <div className="flex w-full items-center justify-between">
          <Link href={`/category/${categoryType}/${cardId}`}>
            <h3>제목</h3>
          </Link>
          <div>기간</div>
        </div>
        <div className="text-xs text-slate-400">위치</div>
      </div>
    </div>
  );
};

ContentCard.skeleton = () => {
  return (
    <div className="flex cursor-not-allowed flex-col">
      <div className="skeleton-card h-40 w-full rounded-md bg-slate-300" />
      <div className="flex flex-col items-start justify-center">
        <div className="my-1 flex h-[24px] w-full items-center justify-between">
          <div className="skeleton-card h-full w-1/3 rounded-md bg-slate-300" />

          <div className="skeleton-card h-full w-1/4 rounded-md bg-slate-300" />
        </div>
        <div className="skeleton-card h-[16px] w-[40px] rounded-md bg-slate-300 text-xs" />
      </div>
    </div>
  );
};

export default ContentCard;
