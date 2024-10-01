"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FiHeart, FiHome, FiMapPin, FiSearch, FiUser } from "react-icons/fi";

import NavIconButton from "./nav-icon-button";
import NavLoginButton from "./nav-login-button";
import NavLogo from "./nav-logo";

const NAV_ITEMS = [
  { href: "/", name: "홈", icon: FiHome },
  { href: "/popups", name: "검색", icon: FiSearch },
  { href: "/map", name: "지도", icon: FiMapPin },
  { href: "/likes", name: "찜 목록", icon: FiHeart },
];

export default function NavMenu({ loggedIn }: { loggedIn: boolean }) {
  const pathname = usePathname();
  const isSearchPage = pathname === "/popups";
  const profileUrl = loggedIn ? "/profile" : "/login";

  return (
    <menu
      className={clsx(
        "md:w-70 md:pt-30 lg:w-245 flex size-full items-center justify-evenly md:flex-col md:items-center md:justify-start md:gap-14",
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
  );
}
