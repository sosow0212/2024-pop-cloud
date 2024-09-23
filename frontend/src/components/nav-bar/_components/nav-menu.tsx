import React from "react";
import { FiHome, FiSearch, FiMapPin, FiUser } from "react-icons/fi";
import NavIconButton from "./nav-icon-button";

const NAV_ITEMS = [
  { href: "/", name: "홈", icon: FiHome },
  { href: "/search", name: "검색", icon: FiSearch },
  { href: "/map", name: "지도", icon: FiMapPin },
  { href: "/profile", name: "프로필", icon: FiUser },
];

export default function NavMenu() {
  return (
    <menu className="flex size-full items-center justify-around md:flex-col md:items-center md:justify-start md:gap-14">
      {NAV_ITEMS.map(({ href, name, icon: Icon }) => (
        <NavIconButton key={href} href={href} name={name}>
          <Icon className="size-24 lg:ml-12" />
        </NavIconButton>
      ))}
    </menu>
  );
}
