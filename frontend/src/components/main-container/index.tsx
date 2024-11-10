"use client";

import clsx from "clsx";
import { ReactNode } from "react";

import { useShrinkNavStore } from "@/store";

/**
 * 사이드 바 크기에 따라서 마진을 적용하는 컨테이너입니다.
 *
 * @author ☯️채종민
 */

export default function MainContainer({ children }: { children: ReactNode }) {
  const isSideNavShrink = useShrinkNavStore();

  return (
    <main
      className={clsx(
        "mb-50 grow overflow-hidden md:mb-0",
        isSideNavShrink ? "md:ml-75" : "md:ml-245",
      )}
    >
      {children}
    </main>
  );
}
