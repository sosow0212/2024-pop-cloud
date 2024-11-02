"use client";

import clsx from "clsx";
import { memo } from "react";
import { FiUser } from "react-icons/fi";

import { useModalStore } from "@/store";

interface NavLoginButtonProps {
  shrink: boolean;
}

function NavLoginButton({ shrink }: NavLoginButtonProps) {
  const { onOpen } = useModalStore();
  const handleClick = () => onOpen("login");

  return (
    <button
      type="button"
      className={clsx(
        "flex size-48 items-center justify-center rounded-5 text-center hover:bg-gray-2",
        !shrink && "lg:w-220 lg:pl-12",
      )}
      onClick={handleClick}
    >
      <div
        className={clsx(
          "flex w-full justify-center gap-16",
          shrink ? "lg:justify-center" : "lg:justify-start",
        )}
      >
        <FiUser className="size-24 text-gray-3" />
        <span
          className={clsx("hidden text-gray-3 lg:block", shrink && "lg:hidden")}
        >
          로그인
        </span>
      </div>
    </button>
  );
}

export default memo(NavLoginButton);
