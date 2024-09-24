import React from "react";
import Link from "next/link";
import BackButton from "./_components/back-button";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-60 items-center border-b border-gray-300 bg-white  md:hidden">
      <BackButton />
      <Link href="/">
        <h1 className="pl-16 font-[TTSamlipCreamyWhiteR] text-15 font-bold text-purple-400">
          POP CLOUD
        </h1>
      </Link>
    </header>
  );
}
