"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MainReviews = () => {
  //  react query 이용해서 리뷰 받아오기
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const animationId = useRef();

  useEffect(() => {
    if (!wrapperRef.current || !ulRef.current) return;
    const wrapper = wrapperRef.current;
    const ul = ulRef.current;

    const fullWidth = ul.clientWidth;
    const left = ul.getBoundingClientRect().x;
    if (-left > fullWidth) {
    }
  }, []);

  return (
    // carousel 로 꾸미기
    <article className="flex flex-col gap-y-2">
      <h3>최근 등록 된 리뷰 </h3>
      <div ref={wrapperRef} className="flex w-full items-center">
        <ul ref={ulRef}>
          {Array.from({ length: 10 }).map((aa, idx) => (
            <li key={idx} className="flex items-center gap-x-2">
              <MainReviews.review />
            </li>
          ))}
          {Array.from({ length: 10 }).map((aa, idx) => (
            <li key={idx} className="flex items-center gap-x-2">
              <MainReviews.review />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

interface ReviewProps {
  writer: string;
  text: string;
  location: string;
  date: Date;
}

MainReviews.review = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* 등록자의  프로필 이미지 */}
      <div className="size-10 rounded-full bg-blue-400" />
      <div className="flex w-full items-center justify-between">
        <div>
          <p>리뷰 블라블라</p>
          <h4>해당 장소 </h4>
        </div>
        <div>등록 날짜</div>
      </div>
    </div>
  );
};

export default MainReviews;
