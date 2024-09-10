import Image from "next/image";

interface FooterIconProps {
  link: string;
  icon: "github" | "x" | "instagram";
}

const FooterIcon = ({ icon, link }: FooterIconProps) => {
  return (
    <a href={link} className="relative size-4">
      <Image src={`/icons/${icon}.svg`} fill alt={icon} />
    </a>
  );
};

export default FooterIcon;
