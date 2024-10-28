"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useState } from "react";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";

import FilterSidebar from "./filter-sidebar";
import MobileFilterSidebar from "./mobile-filter";

const DesktopFilterButton = memo(
  ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
    <motion.button
      type="button"
      onClick={onClick}
      className={clsx(
        "absolute top-1/2 -translate-y-1/2",
        "flex h-50 w-30 items-center justify-center rounded-r-md border border-gray-200 bg-white",
      )}
      animate={{
        left: isOpen ? "300px" : "0",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      aria-label={isOpen ? "필터 닫기" : "필터 열기"}
    >
      <HiOutlineAdjustmentsVertical className="size-50 text-gray-600" />
    </motion.button>
  ),
);

DesktopFilterButton.displayName = "DesktopFilterButton";

function FilterContainer() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = useCallback(() => {
    setIsFilterOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* 데스크탑 */}
      <div className="fixed left-70 top-0 z-50 hidden h-screen md:block">
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
        <DesktopFilterButton isOpen={isFilterOpen} onClick={toggleFilter} />
      </div>

      {/* 모바일 */}
      <div className="md:hidden">
        <MobileFilterSidebar />
      </div>
    </>
  );
}

export default memo(FilterContainer);
