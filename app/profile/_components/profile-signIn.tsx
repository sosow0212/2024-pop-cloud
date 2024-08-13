"use client";

import { useModalStore } from "@/lib/store";

const ProfileSignIn = () => {
  const { onOpen } = useModalStore();
  return (
    <div className="py-2">
      {/* 프로필 or 로그인/회원가입 */}
      {/* <div className="size-12 rounded-full bg-blue-300" /> */}
      <button
        onClick={() => onOpen("auth")}
        className="text-sky-500 underline underline-offset-4"
      >
        로그인 / 회원가입
      </button>
    </div>
  );
};

export default ProfileSignIn;
