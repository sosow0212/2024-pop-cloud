"use client";
import Link from "next/link";
import HeaderMenu from "./header-menu";
import HeaderSearch from "./header-search";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b p-2">
      <Link href="/">
        <h1 className="font-bold">POP CLOUD</h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <HeaderSearch />
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
