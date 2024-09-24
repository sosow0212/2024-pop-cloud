import { GiFluffyCloud } from "react-icons/gi";

import clsx from "clsx";
import Link from "next/link";

export default function NavLogo({ isSearchPage }: { isSearchPage: boolean }) {
  return (
    <Link href="/" className="mb-25 hidden md:block">
      <header>
        <GiFluffyCloud
          className={clsx(
            "size-40 text-purple-400 md:block",
            isSearchPage ? "lg:block" : "lg:hidden",
          )}
        />
        <h1
          className={clsx(
            "hidden font-[TTSamlipCreamyWhiteR] text-25 font-bold text-purple-400",
            isSearchPage ? "lg:hidden" : "lg:block",
          )}
        >
          POP CLOUD
        </h1>
      </header>
    </Link>
  );
}
