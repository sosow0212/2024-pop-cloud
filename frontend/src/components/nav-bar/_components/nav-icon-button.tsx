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
        "flex size-68 items-center justify-center rounded-5 text-center hover:bg-gray-2",
        !shrink && "md:w-220 md:pl-12",
        isActive && "bg-gray-2",
      )}
    >
      <div
        className={clsx(
          "flex w-full items-center",
          shrink
            ? "flex-col justify-center gap-5"
            : "flex-row justify-start gap-15",
        )}
      >
        <Icon
          className={clsx("size-24", isActive ? "text-white" : "text-gray-3")}
        />
        <span
          className={clsx(
            "hidden md:block",
            shrink ? "text-13" : "text-18",
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
