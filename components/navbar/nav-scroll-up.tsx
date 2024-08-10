import { ChevronUp } from "lucide-react";
import { MouseEvent } from "react";

const NavScrollUp = () => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };
  return (
    <button
      onClick={handleClick}
      className="absolute right-2 top-0 z-50 flex size-10 -translate-y-[120%] items-center justify-center rounded-full border bg-slate-50"
    >
      <ChevronUp className="size-6 stroke-black" />
    </button>
  );
};

export default NavScrollUp;
