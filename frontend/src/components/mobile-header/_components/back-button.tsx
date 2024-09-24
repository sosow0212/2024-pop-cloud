"use client";

import { useRouter, usePathname } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const isPopupDetail =
    pathname.startsWith("/popups/") && pathname.split("/").length === 3;

  if (isPopupDetail) {
    return (
      <button
        type="button"
        onClick={router.back}
        className="flex h-full w-50 items-center justify-center"
      >
        <IoIosArrowBack className="size-25 fill-black" />
      </button>
    );
  }
}
