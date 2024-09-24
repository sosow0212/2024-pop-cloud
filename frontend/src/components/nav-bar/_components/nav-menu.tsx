"use client";

import { FiHome, FiSearch, FiMapPin, FiUser, FiHeart } from "react-icons/fi";
import { GiFluffyCloud } from "react-icons/gi";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import NavIconButton from "./nav-icon-button";

const NAV_ITEMS = [
  { href: "/", name: "홈", icon: FiHome },
  { href: "/search", name: "검색", icon: FiSearch },
  { href: "/map", name: "지도", icon: FiMapPin },
  { href: "/favorite", name: "찜 목록", icon: FiHeart },
  { href: "/profile", name: "프로필", icon: FiUser },
];

export default function NavMenu() {
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  return (
    <menu
      className={clsx(
        "flex size-full items-center justify-evenly md:w-70 md:flex-col md:items-center md:justify-start md:gap-14 md:pt-30 lg:w-245",
        isSearchPage && "lg:w-70",
      )}
    >
      <Link href="/">
        <header className="mb-25 hidden md:block">
          <GiFluffyCloud
            className={clsx(
              "size-40 text-purple-400 md:block",
              isSearchPage ? "lg:block" : "lg:hidden",
            )}
          />
          <h1
            className={clsx(
              "hidden font-[TTSamlipCreamyWhiteR] text-25 font-bold text-purple-400",
              isSearchPage ? "lg:hidden" : "lg:block",
            )}
          >
            POP Cloud
          </h1>
        </header>
      </Link>
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
    </menu>
  );
}
