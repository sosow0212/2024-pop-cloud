import React from "react";
import { BsFilterLeft } from "react-icons/bs";
import { FiMapPin, FiRefreshCw, FiTag } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";

import CheckboxList from "./check-list";
import DateFilter from "./date-ficker";
import FilterAccordion from "./filter-acordian";
import RegionSelector from "./region-select";

const placeTypes = [
  "브랜드",
  "패션",
  "뷰티",
  "음식",
  "홈",
  "완구류",
  "레저",
  "서적",
  "음악",
  "펫",
  "운동",
  "디지털",
  "예술",
  "캐릭터",
  "굿즈",
  "전시",
  "기타",
];

export default function FilterSidebar() {
  return (
    <aside className="flex h-screen w-300 flex-col border-r border-gray-200 bg-white px-12 pt-30">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="mb-8 flex items-center gap-9">
          <BsFilterLeft className="size-20" />
          <h2 className="text-18-400">필터</h2>
        </div>
        <button
          type="button"
          className="mb-8 size-18 text-gray-400 transition-colors hover:text-gray-600"
        >
          <FiRefreshCw className="size-20" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <FilterAccordion title="태그" icon={<FiTag className="size-20" />}>
          <CheckboxList items={placeTypes} />
        </FilterAccordion>

        <FilterAccordion title="지역" icon={<FiMapPin className="size-22" />}>
          <RegionSelector />
        </FilterAccordion>

        <FilterAccordion
          title="날짜"
          icon={<LuCalendarDays className="size-20" />}
        >
          <DateFilter />
        </FilterAccordion>
      </div>
    </aside>
  );
}
