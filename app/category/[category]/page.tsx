"use client";

import CatagoryNav from "./_component/category-nav";
import CategoryList from "./_component/category-list";
import { useEffect, useState } from "react";

interface CategoryProps {
  params: {
    category: string;
  };
}

const CategoryPage = ({ params }: CategoryProps) => {
  const [searchDate, setSearchDate] = useState<ISearchDate>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [searchRegions, setSearchRegions] = useState<ISearchRegion[]>([
    "서울특별시",
  ]);
  const [searchTags, setSearchTags] = useState<IPublicTag[]>(["브랜드"]);

  const handleDate = (start: Date, end: Date) => {
    setSearchDate({
      startDate: start,
      endDate: end,
    });
  };
  const handleRegions = (value: ISearchRegion, isAdd: boolean) => {
    if (isAdd) setSearchRegions((p) => [...p, value]);
    else setSearchRegions((p) => p.filter((r) => r !== value));
  };
  const handleTags = (value: IPublicTag, isAdd: boolean) => {
    if (isAdd) setSearchTags((p) => [...p, value]);
    else setSearchTags((p) => p.filter((r) => r !== value));
  };

  useEffect(() => {
    console.group("선택된 검색 요소들");
    console.log("날짜", searchDate);
    console.log("태그", searchTags);
    console.log("지역", searchRegions);
  }, [searchTags, searchRegions, searchDate]);

  return (
    <section className="flex flex-col space-y-4 py-4">
      <CatagoryNav
        handleDate={handleDate}
        handleRegions={handleRegions}
        handleTags={handleTags}
      />

      <CategoryList
        categoryType={(params.category as "popup") || "exhibition"}
      />
    </section>
  );
};

export default CategoryPage;
