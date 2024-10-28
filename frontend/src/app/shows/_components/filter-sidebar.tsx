import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { FiMapPin, FiRefreshCw, FiTag } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";

import DateFilter from "./date-ficker";
import FilterAccordion from "./filter-acordian";
import RegionSelector from "./region-select";
import TagButtonList from "./tag-button-list";

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
  "디지털",
  "운동",
  "예술",
  "전시",
  "굿즈",
  "캐릭터",
  "기타",
];

interface FilterSidebarProps {
  onClose: () => void;
}

export default function FilterSidebar({ onClose }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<{
    city: string;
    country: string[];
  }>({ city: "", country: [] });

  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({ startDate: "", endDate: "" });

  // 복잡한 필터 적용 로직은 useCallback 유지
  const handleApplyFilters = useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString());

    // Tags
    newParams.delete("publicTags");
    selectedTags.forEach((tag) => newParams.append("publicTags", tag));

    // Region
    if (selectedRegion.city) {
      newParams.set("city", selectedRegion.city);
      newParams.delete("country");
      if (selectedRegion.country.length > 0) {
        if (selectedRegion.country[0] !== `${selectedRegion.city} 전체`) {
          selectedRegion.country.forEach((country) =>
            newParams.append("country", country),
          );
        }
      }
    } else {
      newParams.delete("city");
      newParams.delete("country");
    }

    // Date
    if (selectedDateRange.startDate) {
      newParams.set("startDate", selectedDateRange.startDate);
    }
    if (selectedDateRange.endDate) {
      newParams.set("endDate", selectedDateRange.endDate);
    }

    router.push(`/shows?${newParams.toString()}`);
    onClose();
  }, [
    selectedTags,
    selectedRegion,
    selectedDateRange,
    searchParams,
    router,
    onClose,
  ]);

  const handleReset = () => {
    setSelectedTags([]);
    setSelectedRegion({ city: "", country: [] });
    setSelectedDateRange({ startDate: "", endDate: "" });
    router.push("/shows");
  };

  return (
    <aside className="flex size-full flex-col border-r border-gray-200 bg-white px-12 pt-40 md:h-screen lg:h-screen">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 md:px-5">
        <div className="mb-8 flex items-center gap-9">
          <BsFilterLeft className="size-20" />
          <h2 className="text-18-400">필터</h2>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="mb-8 size-18 text-gray-400 transition-colors hover:text-gray-600"
        >
          <FiRefreshCw className="size-20" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <FilterAccordion title="태그" icon={<FiTag className="size-20" />}>
          <TagButtonList
            items={placeTypes}
            selectedItems={selectedTags}
            onChange={setSelectedTags}
          />
        </FilterAccordion>

        <FilterAccordion title="지역" icon={<FiMapPin className="size-22" />}>
          <RegionSelector
            selectedRegion={selectedRegion}
            onChange={setSelectedRegion}
          />
        </FilterAccordion>

        <FilterAccordion
          title="날짜"
          icon={<LuCalendarDays className="size-20" />}
        >
          <DateFilter
            selectedDateRange={selectedDateRange}
            onChange={setSelectedDateRange}
          />
        </FilterAccordion>
      </div>

      <div className="sticky mb-30 p-4">
        <button
          type="button"
          onClick={handleApplyFilters}
          className="text-16-bold h-40 w-full rounded-10 bg-blue-6 py-3 text-white transition-colors hover:bg-blue-5 focus:outline-none"
        >
          적용하기
        </button>
      </div>
    </aside>
  );
}
