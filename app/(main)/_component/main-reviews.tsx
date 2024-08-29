"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const MainReviews = () => {
  //  react query 이용해서 리뷰 받아오기
  const router = useRouter();
  const [isFirstClick, setIsFirstClick] = useState(false);
  const [n, setN] = useState(2); // 버튼 클릭 이벤트 모션을 위해 선언한 임시 state
  const handleClick = () => {
    if (!isFirstClick) {
      setIsFirstClick(true);
      // 쿼리 패치 이용해서 한 번 더 리뷰 데이터 받아오기
      setN(4);
    } else {
      router.push("review");
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h3>최근 등록 된 리뷰 </h3>
      {Array.from({ length: n }).map((aa, idx) => (
        <Review key={idx} />
      ))}

      <button
        onClick={handleClick}
        className="w-full rounded-md bg-blue-400 py-1 text-center text-white transition-colors hover:bg-blue-600"
      >
        더보기
      </button>
      {/* 첫 클릭 시 리뷰 두개 더 보여주고 두 번째 클릭 시 리뷰 페이지로 이동 */}
    </div>
  );
};

interface ReviewProps {
  writer: string;
  text: string;
  location: string;
  date: Date;
}

const Review = () => {
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
