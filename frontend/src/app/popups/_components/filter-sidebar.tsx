import React from "react";
import { BsBuilding } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineToday } from "react-icons/md";
import { TbFilterSearch, TbRefresh } from "react-icons/tb";

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
    <aside className="w-300 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="mb-8 flex items-center gap-5">
          <TbFilterSearch className="size-20" />
          <h2 className="text-18-400">필터</h2>
        </div>
        <button type="button" className="mb-8 size-18 text-gray-400">
          <TbRefresh className="size-20" />
        </button>
      </div>
      <div>
        <FilterAccordion
          title="장소 유형"
          icon={<BsBuilding className="size-20" />}
        >
          <CheckboxList items={placeTypes} />
        </FilterAccordion>

        <FilterAccordion
          title="지역"
          icon={<IoLocationOutline className="size-20" />}
        >
          <RegionSelector />
        </FilterAccordion>

        <FilterAccordion
          title="날짜"
          icon={<MdOutlineToday className="size-20" />}
        >
          <DateFilter />
        </FilterAccordion>
      </div>
    </aside>
  );
}
