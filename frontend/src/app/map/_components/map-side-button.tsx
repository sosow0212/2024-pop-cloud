import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import cn from "@/components/ui/cn";

interface ButtonProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function MobileButton({ isOpen, setIsOpen }: ButtonProps) {
  return (
    <button
      className={cn(
        "top-0 -translate-y-full left-1/2 -translate-x-1/2 rounded-t-lg bg-gray-200 border-gray-400 border border-b-0 hover:bg-gray-300 text-slate-500 absolute",
      )}
      type="button"
      onClick={() => setIsOpen((p) => !p)}
    >
      {isOpen ? (
        <ChevronDown className="h-20 w-60" />
      ) : (
        <ChevronUp className="h-20 w-60" />
      )}
    </button>
  );
}
function DesktopButton({ isOpen, setIsOpen }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-r-lg bg-gray-100 hover:bg-gray-200 py-10 text-slate-500 absolute top-1/2 right-0 translate-x-full -translate-y-1/2 border-gray-400 border border-l-0",
      )}
      type="button"
      onClick={() => setIsOpen((p) => !p)}
    >
      {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
}

export default function MapSideButton({
  isOpen,
  setIsOpen,
  isMobile,
}: ButtonProps & {
  isMobile: boolean;
}) {
  return isMobile ? (
    <MobileButton isOpen={isOpen} setIsOpen={setIsOpen} />
  ) : (
    <DesktopButton isOpen={isOpen} setIsOpen={setIsOpen} />
  );
}
