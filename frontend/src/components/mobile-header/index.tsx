import Link from "next/link";
import React from "react";

import BackButton from "./_components/back-button";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-60 items-center border-b border-gray-1 bg-gray-1  md:hidden">
      <BackButton />
      <Link href="/">
        <h1 className="pl-16 font-[TTSamlipCreamyWhiteR] text-15 font-bold text-blue-5">
          POP CLOUD
        </h1>
      </Link>
    </header>
  );
}
