"use client";

import { usePathname } from "next/navigation";

import FilterContainer from "./filter-container";

export default function FilterWrapper() {
  const pathname = usePathname();
  const showFilter = pathname === "/shows";

  if (!showFilter) {
    return null;
  }

  return <FilterContainer />;
}
