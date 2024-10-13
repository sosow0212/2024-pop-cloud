import { create } from "zustand";

interface UserState {
  name: string | null;
  email: string | null;
  setUser: (accessToken: string, name: string, email: string) => void;
  clearUser: () => void;
}

/**
 * 유저 정보 저장합니다.
 * 이메일, 닉네임 저장
 *
 * @example
 *
 * const { name, email, setUser, clearUser } = useUserStore();
 * setUser('my-access-token', '옵티머스', 'dd@dd.com');
 * clearUser();
 *
 * @author 채종민
 */

const useUserStore = create<UserState>((set) => ({
  name: null,
  email: null,
  setUser: (name, email) => {
    set({ name, email });
  },
  clearUser: () => {
    set({ name: null, email: null });
  },
}));

export default useUserStore;
