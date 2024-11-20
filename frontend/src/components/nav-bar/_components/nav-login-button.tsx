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
        "flex size-58 items-center justify-center rounded-5 text-center hover:bg-gray-2",
        !shrink && "md:w-220 md:pl-12",
      )}
      onClick={handleClick}
    >
      <div
        className={clsx(
          "flex w-full items-center",
          shrink
            ? "flex-col justify-center gap-5"
            : "flex-row justify-start gap-15",
        )}
      >
        <FiUser className="size-24 text-gray-3" />
        <span
          className={clsx(
            "hidden text-gray-3 md:block",
            shrink ? "text-13" : "text-18",
          )}
        >
          로그인
        </span>
      </div>
    </button>
  );
}

export default memo(NavLoginButton);
