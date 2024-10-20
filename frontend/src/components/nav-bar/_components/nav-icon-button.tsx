import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import { IconType } from "react-icons";

interface NavIconButtonProps {
  href: string;
  name: string;
  icon: IconType;
  isActive: boolean;
  shrink: boolean;
}

function NavIconButton({
  href,
  name,
  icon: Icon,
  isActive,
  shrink,
}: NavIconButtonProps) {
  return (
    <Link
      key={href}
      href={href}
      className={clsx(
        "flex size-48 items-center justify-center rounded-5 text-center hover:bg-gray-100",
        !shrink && "lg:w-220 lg:pl-12",
      )}
    >
      <div
        className={clsx(
          "flex w-full justify-center gap-16 lg:justify-start",
          shrink && "lg:justify-center",
        )}
      >
        <Icon
          className={clsx("size-24 text-black", isActive && "text-blue-500")}
        />
        <span
          className={clsx("hidden text-black lg:block", shrink && "lg:hidden")}
        >
          {name}
        </span>
      </div>
    </Link>
  );
}

export default memo(NavIconButton);
