"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { shrinkPage } from "@/constants";

/**
 * 사이드 바 크기에 따라서 마진을 적용하는 컨테이너입니다.
 *
 * @author ☯️채종민
 */

export default function MainContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shrinkSideBar = shrinkPage.includes(pathname);

  return (
    <main
      className={clsx(
        "mb-50 grow overflow-hidden md:mb-0 md:ml-70",
        !shrinkSideBar && "lg:ml-245",
      )}
    >
      {children}
    </main>
  );
}
