"use client";

import { useIsMobileStore } from "@/store";
import { useEffect } from "react";

export default function MobileSizeWatcher() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480px)");

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      useIsMobileStore.setState(e.matches);
    };

    // 초기 렌더링 시 확인
    useIsMobileStore.setState(mediaQuery.matches);

    // 미디어 쿼리 변경 시 이벤트 등록
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return null;
}
