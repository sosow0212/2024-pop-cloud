import { create } from "zustand";

type UseIsMobileStore = boolean | null;

/**
 * 현재 화면 크기가 모바일인지 boolean 값을 가지고 있는 전역 변수입니다.
 *
 * 모바일인지 알고 싶을 때 사용합니다.
 *
 * @example const isMobile = useIsMobileStore();
 * @author ☯️채종민
 */

const useIsMobileStore = create<UseIsMobileStore>(
  () => null, // isMobile의 초기값
);

export default useIsMobileStore;
