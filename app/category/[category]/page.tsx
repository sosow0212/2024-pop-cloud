"use client";

import CatagoryNav from "./_component/category-nav";
import CategoryList from "./_component/category-list";
import { useState } from "react";

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

  const [searchRegions, setSearchRegions] = useState<ISearchRegion[]>([]);
  const [searchTags, setSearchTags] = useState<IPublicTag[]>([]);
  // no date-> 오늘~오늘 , no regions -> 전체, no tags-> no
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
