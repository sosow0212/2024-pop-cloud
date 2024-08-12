"use client";

import { useState } from "react";
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
  const [startDate, setStartDate] = useState(() => Date.now());
  const [endDate, setEndDate] = useState(() => Date.now());

  return (
    <section className="flex h-full flex-col space-y-4">
      <div>팝업 스토어/ 개인 전시회 목록 페이지 기본 값으로 page는 {page}</div>
      <CatagoryNav />
      <CategoryList />
      <CategoryPagination curPage={+page} lastPage={4} />
    </section>
  );
};

export default CategoryPage;
