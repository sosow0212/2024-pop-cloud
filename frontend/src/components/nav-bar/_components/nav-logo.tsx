import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import { GiFluffyCloud } from "react-icons/gi";

function NavLogo({ shrink }: { shrink: boolean }) {
  return (
    <Link href="/" className="mb-25 hidden md:block">
      <header>
        <GiFluffyCloud
          className={clsx(
            "size-40 text-blue-5 md:block",
            shrink ? "lg:block" : "lg:hidden",
          )}
        />
        <h1
          className={clsx(
            "hidden font-[TTSamlipCreamyWhiteR] text-25 font-bold text-blue-5",
            shrink ? "lg:hidden" : "lg:block",
          )}
        >
          POP CLOUD
        </h1>
      </header>
    </Link>
  );
}
export default memo(NavLogo);
