"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

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

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const currentUrl = new URL(window.location.href);
    if (searchTerm) {
      currentUrl.searchParams.set("title", searchTerm);
    } else {
      currentUrl.searchParams.delete("title");
    }
    router.push(currentUrl.toString());
  };

  const handleClear = () => {
    setSearchTerm("");
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("title");
    router.push(currentUrl.toString());
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-1000">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-10">
        <FiSearch className="size-20 text-gray-400" />
      </div>
      <input
        type="text"
        className="my-20 block h-50 w-full rounded-lg border border-gray-300 bg-white py-2 pl-35 pr-10 text-18-400 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-10"
        >
          <FiX className="size-20 text-gray-400 hover:text-gray-500" />
        </button>
      )}
    </form>
  );
}
