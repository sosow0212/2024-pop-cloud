import React from "react";

interface CategoryNavProps {
  selectedDate: number;
}

const CatagoryNav = () => {
  return (
    <nav className="text-sm">
      {/* 날짜 선택 */}
      <div className="flex items-center space-x-2">
        <label htmlFor="data-options">날짜</label>
        <ul className="flex items-center justify-between space-x-4">
          <li>
            <button className="rounded-xl bg-black px-4 py-1 text-white">
              오늘
            </button>
          </li>
          <li>
            <button className="rounded-xl bg-black px-4 py-1 text-white">
              +7일
            </button>
          </li>
          <li>
            <button className="rounded-xl bg-black px-4 py-1 text-white">
              +2주
            </button>
          </li>
          <li>
            <button className="rounded-xl bg-black px-4 py-1 text-white">
              직접 선택
              {/* 클릭시 캘린더 show */}
            </button>
          </li>
        </ul>
      </div>
      {/* 지역 선택 */}
      <div className="flex items-center space-x-2">
        <label htmlFor="location-options">지역</label>
        <ul className="flex items-center justify-between space-x-4">
          <li>
            <button className="rounded-xl bg-black px-4 py-1 text-white">
              전체
            </button>
          </li>
          <li>
            <button className="rounded-xl bg-black px-4 py-1 text-white">
              서울특별시
            </button>
          </li>
          <li>
            <button className="rounded-xl bg-black px-4 py-1 text-white">
              경기도
            </button>
          </li>
          <li>
            <button className="rounded-xl bg-black px-4 py-1 text-white">
              인천광역시
            </button>
          </li>
          <li>
            <button className="rounded-xl bg-black px-4 py-1 text-white">
              강원도
            </button>
          </li>
          <li>
            <button className="rounded-xl bg-black px-4 py-1 text-white">
              부산광역시
            </button>
          </li>
          <li>
            <button className="rounded-xl bg-black px-4 py-1 text-white">
              대전광역시
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CatagoryNav;
