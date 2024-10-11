"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  placeholder?: string;
  initialValue?: string;
}

export default function SearchInput({
  placeholder = "공간명 또는 주소를 검색하세요.",
  initialValue = "",
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("title", searchTerm);
    router.push(currentUrl.toString());
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-1000">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-10">
        <FiSearch className="size-20 text-gray-400" />
      </div>
      <input
        type="text"
        className="my-20 block h-50 w-full rounded-lg border border-gray-300 bg-white py-2 pl-35 pr-3 text-18-400 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
