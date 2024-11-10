import { create } from "zustand";

type UseShrinkNavStore = boolean;

/**
 * 사이드 바 줄어들었는지 저장하는 전역 변수입니다.
 *
 * @example const isShrink = useShrinkNavStore();
 * @author ☯️채종민
 */

const useShrinkNavStore = create<UseShrinkNavStore>(
  () => true, // isShrink 초기값
);

export default useShrinkNavStore;
