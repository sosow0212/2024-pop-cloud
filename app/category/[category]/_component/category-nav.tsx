import { PUBLIC_TAGS } from "@/constants/tag";
import { CategoryCalendar } from "./category-calender";
import { useState } from "react";
import { REGIONS } from "@/constants/region";

interface CategoryNavProps {
  searchRegions: ISearchRegion[];
  searchTags: IPublicTag[];
  searchDate: ISearchDate;

  handleDate: (s: Date, e: Date) => void;
  handleRegions: (v: ISearchRegion, isAdd: boolean) => void;
  handleTags: (v: IPublicTag, isAdd: boolean) => void;
}

const CatagoryNav = ({
  searchDate,
  searchRegions,
  searchTags,
  handleDate,
  handleRegions,
  handleTags,
}: CategoryNavProps) => {
  return (
    <nav className="space-y-1 text-sm">
      {/* 날짜 선택 */}
      <DateNav />
      {/* 지역 선택 */}
      <RegionsNav />
      {/* 태그 선택 */}
      <TagsNav />
    </nav>
  );
};

const DateNav = () => {
  const [openCalender, setOpenCalender] = useState(false);
  return (
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
        <li className="relative">
          <button
            onClick={() => setOpenCalender((p) => !p)}
            className="rounded-xl bg-black px-4 py-1 text-white"
          >
            직접 선택
            {/* 클릭시 캘린더 show */}
          </button>
          <CategoryCalendar
            isOpen={openCalender}
            className="absolute left-0 top-0 translate-y-10"
          />
        </li>
      </ul>
    </div>
  );
};

const RegionsNav = () => {
  return (
    <div className="flex items-center space-x-2 whitespace-nowrap py-1">
      <label htmlFor="location-options">지역</label>
      <ul className="flex items-center justify-between space-x-2 overflow-auto py-2">
        {REGIONS.map((region) => (
          <li key={region}>
            <input
              onChange={(v) => {
                console.log(v.target.checked);
              }}
              className="peer hidden"
              type="checkbox"
              name={region}
              id={region}
            />
            <label
              className="cursor-pointer rounded-xl bg-black px-4 py-1 text-white transition-colors peer-checked:bg-blue-400"
              htmlFor={region}
            >
              {region}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TagsNav = () => {
  return (
    <div className="flex items-center space-x-2 whitespace-nowrap">
      <label htmlFor="location-options">태그</label>
      <ul className="flex items-center justify-between space-x-4 overflow-auto py-2">
        {PUBLIC_TAGS.map((tag) => (
          <li key={tag}>
            <input
              className="peer hidden"
              type="checkbox"
              name={tag}
              id={tag}
            />
            <label
              className="cursor-pointer rounded-xl bg-black px-4 py-1 text-white transition-colors peer-checked:bg-blue-400"
              htmlFor={tag}
            >
              {tag}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LiInput = ({ title }: { title: string }) => {
  return (
    <li key={title}>
      <input
        onChange={(v) => {
          console.log(v.target.checked);
        }}
        className="peer hidden"
        type="checkbox"
        name={title}
        id={title}
      />
      <label
        className="cursor-pointer rounded-xl bg-black px-4 py-1 text-white transition-colors peer-checked:bg-blue-400"
        htmlFor={title}
      >
        {title}
      </label>
    </li>
  );
};

export default CatagoryNav;
