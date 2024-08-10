import Image from "next/image";
import Link from "next/link";

interface NavIconProps {
  title: string;
  href: string;
  icon: string;
}

const NavIcon = ({ href, icon, title }: NavIconProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center space-y-1"
    >
      <div className="relative size-7">
        <Image fill src={`/icons/${icon}.svg`} alt={title} />
      </div>
      <h3 className="text-[0.7rem]">{title}</h3>
    </Link>
  );
};

export default NavIcon;
