"use client";

import CatagoryNav from "./_component/category-nav";
import CategoryList from "./_component/category-list";
import { useCallback, useEffect, useState } from "react";
import { PUBLIC_TAGS, REGIONS } from "@/constants";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPopupList } from "@/actions/api-action/popup-actions";

interface CategoryProps {
  params: {
    category: string;
  };
}

const TODAY = {
  startDate: new Date(),
  endDate: new Date(),
};
const CategoryPage = ({ params }: CategoryProps) => {
  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery({
  //   queryKey: ['projects'],
  //   queryFn: getPopupList,
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  // })

  const [searchDate, setSearchDate] = useState<ISearchDate>(TODAY);
  const [searchRegions, setSearchRegions] = useState<ISearchRegion[]>(REGIONS);
  const [searchTags, setSearchTags] = useState<IPublicTag[]>(PUBLIC_TAGS);

  const handleDate = useCallback((start: Date, end: Date) => {
    setSearchDate({
      startDate: start,
      endDate: end,
    });
  }, []);

  return (
    <section className="flex flex-col space-y-4 py-4">
      <CatagoryNav
        searchRegions={searchRegions}
        searchTags={searchTags}
        handleDate={handleDate}
        setSearchRegions={setSearchRegions}
        setSearchTags={setSearchTags}
      />

      <CategoryList
        categoryType={(params.category as "popup") || "exhibition"}
      />
    </section>
  );
};

export default CategoryPage;
