"use client";

import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";

import { DrawerDialogContainer } from "@/components/modal/modal-container";

import FilterSidebar from "./filter-sidebar";

export default function MobileFilterSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DrawerDialogContainer
        isOpen={isOpen}
        onClose={handleClose}
        className="h-[80vh] overflow-hidden rounded-t-[10px]"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="필터 닫기"
            >
              <FiX className="size-24" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <FilterSidebar onClose={handleClose} />
          </div>
        </div>
      </DrawerDialogContainer>

      {!isOpen && (
        <div className="z-35 fixed inset-x-0 bottom-[60px] flex justify-center">
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex items-center justify-center space-x-2 rounded-full border border-gray-200 bg-white px-6 py-3 shadow-lg"
            aria-label="필터 열기"
          >
            <HiOutlineAdjustmentsVertical className="size-24 text-gray-600" />
            <span className="font-12-400 text-gray-700">필터</span>
          </button>
        </div>
      )}
    </>
  );
}
