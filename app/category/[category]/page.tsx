"use client";

import { useEffect, useState } from "react";
import CatagoryNav from "./_component/category-nav";
import CategoryList from "./_component/category-list";
import CategoryPagination from "./_component/category-pagination";

interface CategoryProps {
  params: {
    category: string;
  };
  searchParams: {
    page: string;
  };
}

const CategoryPage = ({
  params,
  searchParams: { page = "1" },
}: CategoryProps) => {
  // const [startDate, setStartDate] = useState(() => Date.now());
  // const [endDate, setEndDate] = useState(() => Date.now());

  // date와 지역을 searchParamse으로 관리할 지 state로 관리할 지 고민
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await fetch("aaa", {
          headers: {
            Accept: "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <section className="flex flex-col space-y-4 py-4">
      <CatagoryNav />
      <div>
        <div>{params.category} 페이지</div> <div>현재 page는 {page}</div>
      </div>
      <CategoryList
        categoryType={(params.category as "popup") || "exhibition"}
      />
      <CategoryPagination curPage={+page} lastPage={4} />
    </section>
  );
};

export default CategoryPage;
