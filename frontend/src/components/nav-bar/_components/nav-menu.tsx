"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FiHeart, FiHome, FiMapPin, FiSearch, FiUser } from "react-icons/fi";

import { shrinkPage } from "@/constants";

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
  const shrink = shrinkPage.includes(pathname);

  const profileUrl = loggedIn ? "/profile" : "/login";

  return (
    <div className="flex md:h-full lg:h-screen">
      <menu
        className={clsx(
          "flex size-full items-center justify-evenly md:w-70 md:flex-col md:items-center md:justify-start md:gap-14 md:pt-30 lg:w-245",
          shrink && "lg:w-70",
        )}
      >
        <NavLogo shrink={shrink} />
        {NAV_ITEMS.map(({ href, name, icon }) => {
          const isActive = pathname === href;

          return (
            <NavIconButton
              key={href}
              href={href}
              name={name}
              icon={icon}
              isActive={isActive}
              shrink={shrink}
            />
          );
        })}
        {loggedIn ? (
          <NavIconButton
            href={profileUrl}
            name="프로필"
            icon={FiUser}
            isActive={pathname === profileUrl}
            shrink={shrink}
          />
        ) : (
          <NavLoginButton shrink={shrink} />
        )}
      </menu>
    </div>
  );
}
