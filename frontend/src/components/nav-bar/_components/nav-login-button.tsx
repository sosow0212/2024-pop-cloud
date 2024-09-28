"use client";

import clsx from "clsx";
import { memo } from "react";
import { FiUser } from "react-icons/fi";

import { useModalStore } from "@/store";

interface NavLoginButtonProps {
  isSearchPage: boolean;
}

function NavLoginButton({ isSearchPage }: NavLoginButtonProps) {
  const { onOpen } = useModalStore();
  const handleClick = () => onOpen("login");

  return (
    <button
      type="button"
      className={clsx(
        "flex size-48 items-center justify-center rounded-5 text-center hover:bg-gray-100",
        isSearchPage ? "lg:w-48 lg:pl-0" : "lg:w-220 lg:pl-12",
      )}
      onClick={handleClick}
    >
      <div
        className={clsx(
          "flex w-full justify-center gap-16 lg:justify-start",
          isSearchPage && "lg:justify-center",
        )}
      >
        <FiUser className="size-24 text-black" />
        <span
          className={clsx(
            "hidden text-black lg:block",
            isSearchPage && "lg:hidden",
          )}
        >
          로그인
        </span>
      </div>
    </button>
  );
}

export default memo(NavLoginButton);
