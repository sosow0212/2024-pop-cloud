"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  // FiChevronLeft,
  // FiChevronRight,
  FiHeart,
  FiHome,
  FiMapPin,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";

import FilterSidebar from "@/app/shows/_components/filter-sidebar";
import MobileFilterSidebar from "@/app/shows/_components/mobile-filter";

import NavIconButton from "./nav-icon-button";
import NavLoginButton from "./nav-login-button";
import NavLogo from "./nav-logo";

const NAV_ITEMS = [
  { href: "/", name: "홈", icon: FiHome },
  { href: "/shows", name: "검색", icon: FiSearch },
  { href: "/map", name: "지도", icon: FiMapPin },
  { href: "/likes", name: "찜 목록", icon: FiHeart },
];

export default function NavMenu({ loggedIn }: { loggedIn: boolean }) {
  const pathname = usePathname();
  const isSearchPage = pathname === "/shows";
  const profileUrl = loggedIn ? "/profile" : "/login";
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="flex md:h-full lg:h-screen">
      <menu
        className={clsx(
          "flex size-full items-center justify-evenly md:w-70 md:flex-col md:items-center md:justify-start md:gap-14 md:pt-30 lg:w-245",
          isSearchPage && "lg:w-70",
        )}
      >
        <NavLogo isSearchPage={isSearchPage} />
        {NAV_ITEMS.map(({ href, name, icon }) => {
          const isActive = pathname === href;

          return (
            <NavIconButton
              key={href}
              href={href}
              name={name}
              icon={icon}
              isActive={isActive}
              isSearchPage={isSearchPage}
            />
          );
        })}
        {loggedIn ? (
          <NavIconButton
            href={profileUrl}
            name={loggedIn ? "프로필" : "로그인"}
            icon={FiUser}
            isActive={pathname === profileUrl}
            isSearchPage={isSearchPage}
          />
        ) : (
          <NavLoginButton isSearchPage={isSearchPage} />
        )}
      </menu>
      {isSearchPage && (
        <>
          <div className="hidden md:block">
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 300 }}
                  exit={{ width: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="overflow-hidden"
                >
                  <div className="w-300">
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
                "flex h-50 w-30 items-center justify-center rounded-r-md border border-gray-200 bg-white",
              )}
              animate={{
                left: isFilterOpen ? "calc(100%)" : "100%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              aria-label={isFilterOpen ? "필터 닫기" : "필터 열기"}
            >
              {isFilterOpen ? (
                <HiOutlineAdjustmentsVertical className="size-50 text-gray-600" />
              ) : (
                <HiOutlineAdjustmentsVertical className="size-50 text-gray-600" />
              )}
            </motion.button>
          </div>
          <div className="md:hidden">
            <MobileFilterSidebar />
          </div>
        </>
      )}
    </div>
  );
}
