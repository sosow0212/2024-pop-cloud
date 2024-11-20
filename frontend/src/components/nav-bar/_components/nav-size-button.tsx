"use client";

import { memo } from "react";
import { BsArrowLeftSquare } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";

interface NavSizeButtonProps {
  shrink: boolean;
  toggleShrink: () => void;
}

function NavLoginButton({ shrink, toggleShrink }: NavSizeButtonProps) {
  return (
    <button
      type="button"
      className="relative hidden md:block "
      onClick={toggleShrink}
    >
      {shrink ? (
        <IoMdMenu className="size-25 text-gray-3 hover:text-white" />
      ) : (
        <BsArrowLeftSquare className="absolute bottom-2 left-80 size-28 text-gray-3 hover:text-white" />
      )}
    </button>
  );
}

export default memo(NavLoginButton);
