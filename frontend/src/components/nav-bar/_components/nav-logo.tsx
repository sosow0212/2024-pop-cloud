import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import { SiPopos } from "react-icons/si";

function NavLogo({ shrink }: { shrink: boolean }) {
  return (
    <Link href="/" className="mb-25 hidden md:block">
      <header className="items-center justify-start gap-4 lg:flex">
        <SiPopos
          className={clsx(
            "size-32 text-white",
            shrink ? "md:block" : "md:hidden",
          )}
        />
        <h1
          className={clsx(
            "hidden pt-6 font-[yg-jalnan] text-25 font-bold text-white",
            shrink ? "md:hidden" : "md:block",
          )}
        >
          POP CLOUD
        </h1>
      </header>
    </Link>
  );
}
export default memo(NavLogo);
