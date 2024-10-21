"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ShowTypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState(
    searchParams.get("showType") || "popups",
  );

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("showType", type);
    router.push(`/shows?${newParams.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mb-10 flex h-40 w-80 items-center justify-between rounded-10 border border-gray-300 bg-white px-10 text-16-600 transition-colors hover:bg-gray-50 focus:outline-none">
        {selectedType === "popups" ? "팝업" : "전시"}
        <ChevronDown className="ml-2 size-15" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-30 mt-1 h-80 w-90 rounded-10 border border-gray-200 bg-white p-1 shadow-lg lg:ml-50">
        <DropdownMenuItem
          onClick={() => handleTypeChange("popups")}
          className="cursor-pointer rounded-5 p-10 text-16-600 transition-colors hover:bg-gray-100"
        >
          팝업
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleTypeChange("exhibition")}
          className="cursor-pointer rounded-5 p-10 text-16-600 transition-colors hover:bg-gray-100"
        >
          전시
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
