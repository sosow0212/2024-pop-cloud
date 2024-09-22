import { create } from "zustand";

type UseIsMobileStore = boolean | null;

const useIsMobileStore = create<UseIsMobileStore>(
  () => null, // isMobile의 초기값
);

export default useIsMobileStore;
