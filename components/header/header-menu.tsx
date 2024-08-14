import { Menu } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "zero-cnn";
import { ITarget } from "./header";
import Link from "next/link";

interface HeaderMenuProps {
  isShow: boolean;
  target: ITarget;
  setShow: (t: ITarget, curT: ITarget) => void;
}
const HeaderMenu = ({ isShow, setShow, target }: HeaderMenuProps) => {
  return (
    <>
      <button onClick={() => setShow("menu", target)}>
        <Menu />
      </button>
      <div
        className={cn(
          "absolute right-0 top-[100%] z-30 overflow-hidden bg-black object-right-top transition-all",
          isShow && target === "menu" ? "h-[100vh] w-full" : "h-0 w-0",
        )}
      >
        <article className="px-2 pb-20 pt-4 text-xl font-bold text-white">
          <ul className="flex flex-col justify-between space-y-10 divide-y-2">
            <li>
              <Link href="/category/popup">팝업</Link>{" "}
            </li>
            <li>
              <Link href="/category/exhibition">전시회</Link>{" "}
            </li>
            <li>
              <Link href="/favorite">좋아요</Link>{" "}
            </li>
            <li>
              <Link href="/review">리뷰</Link>{" "}
            </li>
            <li>
              <Link href="/community">커뮤니티</Link>{" "}
            </li>
            <li className="font-medium text-slate-300">
              <Link href="/help">고객센터</Link>{" "}
            </li>
          </ul>
        </article>
      </div>
    </>
  );
};

export default HeaderMenu;
