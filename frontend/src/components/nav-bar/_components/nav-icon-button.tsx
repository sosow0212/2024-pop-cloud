import Link from "next/link";
import { ReactNode } from "react";

interface NavIconButtonProps {
  children: ReactNode;
  href: string;
  name: string;
}

export default function NavIconButton({
  children,
  href,
  name,
}: NavIconButtonProps) {
  return (
    <Link
      href={href}
      className="flex size-48 items-center justify-center rounded-5 text-center hover:bg-gray-100 lg:w-220"
    >
      <div className="flex w-full justify-center gap-16 lg:justify-start">
        {children}
        <span className="hidden lg:block">{name}</span>
      </div>
    </Link>
  );
}
