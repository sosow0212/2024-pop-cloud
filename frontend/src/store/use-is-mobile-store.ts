import { create } from "zustand";

type UseIsMobileStore = boolean;

const useIsMobileStore = create<UseIsMobileStore>(
  () => false, // isMobile의 초기값
);

export default useIsMobileStore;
