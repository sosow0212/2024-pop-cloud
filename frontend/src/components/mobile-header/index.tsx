import Link from "next/link";
import React from "react";

import BackButton from "./_components/back-button";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-60 items-center border-b border-gray-1 bg-gray-1  md:hidden">
      <BackButton />
      <Link href="/">
        <h1 className="pl-16 pt-2 font-[yg-jalnan] text-16 font-bold text-white">
          POP CLOUD
        </h1>
      </Link>
    </header>
  );
}
