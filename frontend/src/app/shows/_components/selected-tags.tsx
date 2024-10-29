"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoMdClose } from "react-icons/io";

import { Badge } from "@/components/ui/badge";

export default function SelectedTags() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTags = searchParams.getAll("publicTags");

  const handleRemoveTag = (tagToRemove: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    newParams.delete("publicTags");
    updatedTags.forEach((tag) => newParams.append("publicTags", tag));
    router.push(`/shows?${newParams.toString()}`);
  };

  if (selectedTags.length === 0) return null;

  return (
    <div className="mb-7 ml-3 flex flex-wrap items-center justify-center gap-3">
      {selectedTags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="mb-2 mr-3 h-35 rounded-full border border-gray-300"
        >
          {tag}
          <button
            type="button"
            onClick={() => handleRemoveTag(tag)}
            className="ml-3 hover:text-red-500 focus:outline-none"
            aria-label={`${tag} 태그 제거`}
          >
            <IoMdClose size={14} />
          </button>
        </Badge>
      ))}
    </div>
  );
}
