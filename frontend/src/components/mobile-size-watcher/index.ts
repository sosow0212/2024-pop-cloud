"use client";

import { useEffect } from "react";

import { useIsMobileStore } from "@/store";
/**
 * 현재 화면 크기가 모바일인지 주시하는 컴포넌트입니다.
 *
 * 최상단 레이아웃에 박았습니다.
 *
 * @author ☯️채종민
 */

export default function MobileSizeWatcher() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 744px)");

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
