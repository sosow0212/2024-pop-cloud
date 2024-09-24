import Link from "next/link";
import { IconType } from "react-icons";
import clsx from "clsx";
import { memo } from "react";

interface NavIconButtonProps {
  href: string;
  name: string;
  icon: IconType;
  isActive: boolean;
  isSearchPage: boolean;
}

function NavIconButton({
  href,
  name,
  icon: Icon,
  isActive,
  isSearchPage,
}: NavIconButtonProps) {
  return (
    <Link
      key={href}
      href={href}
      className={clsx(
        "flex size-48 items-center justify-center rounded-5 text-center hover:bg-gray-100",
        isSearchPage ? "lg:w-48 lg:pl-0" : "lg:w-220 lg:pl-12",
      )}
    >
      <div
        className={clsx(
          "flex w-full justify-center gap-16 lg:justify-start",
          isSearchPage && "lg:justify-center",
        )}
      >
        <Icon
          className={clsx("size-24 text-black", isActive && "text-blue-500")}
        />
        <span
          className={clsx(
            "hidden text-black lg:block",
            isSearchPage && "lg:hidden",
          )}
        >
          {name}
        </span>
      </div>
    </Link>
  );
}

export default memo(NavIconButton);
