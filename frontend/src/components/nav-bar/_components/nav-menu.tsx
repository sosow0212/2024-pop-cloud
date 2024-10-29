"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FiHeart, FiHome, FiMapPin, FiSearch } from "react-icons/fi";
import { SiBookmyshow } from "react-icons/si";

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

  return (
    <menu
      className={clsx(
        "relative flex size-full items-center justify-evenly md:w-70 md:flex-col md:justify-start md:gap-14 md:pt-30",
        shrink ? "lg:w-70" : "lg:w-245",
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
      <div className="md:absolute md:bottom-16">
        {loggedIn ? (
          <NavIconButton
            href="/profile"
            name="마이페이지"
            icon={SiBookmyshow}
            isActive={pathname === "/profile"}
            shrink={shrink}
          />
        ) : (
          <NavLoginButton shrink={shrink} />
        )}
      </div>
    </menu>
  );
}
