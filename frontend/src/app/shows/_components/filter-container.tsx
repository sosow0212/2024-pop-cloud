"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";

import FilterSidebar from "./filter-sidebar";
import MobileFilterSidebar from "./mobile-filter";

export default function FilterContainer() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <>
      {/* 데스크탑 */}
      <div className="fixed top-0 z-50 hidden h-screen md:block ">
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 300 }}
              exit={{ width: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full overflow-hidden bg-white"
            >
              <div className="h-full w-300">
                <FilterSidebar onClose={toggleFilter} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          type="button"
          onClick={toggleFilter}
          className={clsx(
            "absolute top-1/2 -translate-y-1/2",
            "flex h-50 w-30 items-center justify-center rounded-r-md border",
            isFilterOpen
              ? "border-gray-200 bg-white"
              : "border-gray-1 bg-gray-1",
          )}
          animate={{
            left: isFilterOpen ? "300px" : "0",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          aria-label={isFilterOpen ? "필터 닫기" : "필터 열기"}
        >
          <HiOutlineAdjustmentsVertical
            className={clsx(
              "size-50",
              isFilterOpen ? "text-gray-600" : "text-gray-3",
            )}
          />
        </motion.button>
      </div>

      {/* 모바일 */}
      <div className="md:hidden">
        <MobileFilterSidebar />
      </div>
    </>
  );
}
