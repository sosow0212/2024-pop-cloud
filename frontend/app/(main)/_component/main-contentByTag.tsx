"use client";

import ContentCard from "@/components/ui/content-card";
import { PUBLIC_TAGS } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MainContentByTag = () => {
  const router = useRouter();
  const [isFirstClick, setIsFirstClick] = useState(false);
  const [contentCnt, setContentCnt] = useState(6);
  const handleClick = () => {
    if (!isFirstClick) {
      setIsFirstClick(true);
      setContentCnt(12);
    } else {
      router.push("/category/popup");
    }
  };

  return (
    <section>
      <nav className="mb-4">
        <ul className="flex flex-wrap gap-2">
          {PUBLIC_TAGS.map((tag) => (
            <li
              className="whitespace-nowrap rounded-md bg-blue-600 px-2 py-1 text-sm text-white"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </nav>

      <article className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {Array.from({ length: contentCnt }).map((_, idx) => (
          <ContentCard key={idx} cardId="12312nsad" categoryType="popup" />
        ))}
      </article>
      <button
        onClick={handleClick}
        className="w-full rounded-md bg-blue-400 py-1 text-center text-white transition-colors hover:bg-blue-600"
      >
        더보기
      </button>
    </section>
  );
};

export default MainContentByTag;
