"use client";

import CatagoryNav from "./category-nav";
import CategoryList from "./category-list";
import { useCallback, useEffect, useRef, useState } from "react";
import { PUBLIC_TAGS, REGIONS } from "@/constants";

import { useInfiniteCategory, useInfiniteScroll } from "@/hooks";

interface CategoryMainProps {
  category: "popup" | "exhibition";
}

const TODAY = {
  startDate: new Date(),
  endDate: new Date(),
};
const CategoryMain = ({ category }: CategoryMainProps) => {
  const bottomRef = useRef<HTMLInputElement>(null);

  const [searchDate, setSearchDate] = useState<ISearchDate>(TODAY);
  const [searchRegions, setSearchRegions] = useState<ISearchRegion[]>(REGIONS);
  const [searchTags, setSearchTags] = useState<IPublicTag[]>(PUBLIC_TAGS);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteCategory({
      category,
      searchDate,
      searchRegions,
      searchTags,
    });

  useInfiniteScroll({
    bottomRef,
    loadMoreFunC: () => {},
    shouldMore: hasNextPage,
  });

  const handleDate = useCallback((start: Date, end: Date) => {
    setSearchDate({
      startDate: start,
      endDate: end,
    });
  }, []);

  // if (status === "error")
  //   return (
  //     <section className="flex min-h-[70vh] items-center justify-center text-[3rem] font-bold">
  //       잠시 후 다시 시도해주세요.
  //     </section>
  //   );
  if (status === "pending") <CategoryList.skeleton />;

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
        bottomRef={bottomRef}
        categoryType={(category as "popup") || "exhibition"}
      />

      {/* <div>
        {status === "pending" && !isFetchingNextPage ? (
          <CategoryList.skeleton />
        ) : null}
      </div> */}
    </section>
  );
};

export default CategoryMain;
