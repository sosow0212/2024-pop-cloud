"use client";

import Link from "next/link";
import HeaderMenu from "./header-menu";
import HeaderSearch from "./header-search";
import { useState } from "react";

export type ITarget = "search" | "menu" | undefined;

const Header = () => {
  const [isShow, setIsShow] = useState(false);
  const [target, setTarget] = useState<ITarget>();

  const handleClick = (t: ITarget, curT: ITarget) => {
    if (curT === t) {
      setIsShow(false);
      setTarget(undefined);
    } else {
      setTarget(t);
      setIsShow(true);
    }
  };

  return (
    <header className="sticky inset-x-0 top-0 z-30 shadow-sm">
      <div className="relative flex h-full w-full items-center justify-between bg-white p-2 shadow-slate-200">
        <Link href="/">
          <h1 className="font-bold">POP CLOUD</h1>
        </Link>
        <div className="flex items-center gap-x-2">
          <HeaderSearch isShow={isShow} setShow={handleClick} target={target} />
          <HeaderMenu isShow={isShow} setShow={handleClick} target={target} />
        </div>
      </div>
    </header>
  );
};

export default Header;
