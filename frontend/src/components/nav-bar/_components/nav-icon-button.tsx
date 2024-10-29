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
        "flex size-48 items-center justify-center rounded-5 text-center hover:bg-gray-2",
        !shrink && "lg:w-220 lg:pl-12",
        isActive && "bg-gray-2",
      )}
    >
      <div
        className={clsx(
          "flex w-full justify-center gap-16",
          shrink ? "lg:justify-center" : "lg:justify-start",
        )}
      >
        <Icon
          className={clsx("size-24", isActive ? "text-white" : "text-gray-3")}
        />
        <span
          className={clsx(
            "hidden lg:block",
            shrink && "lg:hidden",
            isActive ? "text-white" : "text-gray-3",
          )}
        >
          {name}
        </span>
      </div>
    </Link>
  );
}

export default memo(NavIconButton);
