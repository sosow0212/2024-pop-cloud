"use client";

import { useRouter } from "next/navigation";
import { IoPricetagSharp } from "react-icons/io5";

interface Props {
  tags: string[];
}
export default function DetailsTags({ tags }: Props) {
  const router = useRouter();
  const handleTagClick = (tag: string) => {
    router.push(`/shows?publicTags=${encodeURIComponent(tag)}`);
  };

  return (
    <section>
      <span className="flex items-center gap-4 text-20-700 md:text-24-700">
        <IoPricetagSharp className="text-blue-5" />
        연관태그
      </span>
      <div className="mt-14 flex gap-16">
        {tags.map((tag) => (
          <button
            type="button"
            className="rounded-6 bg-blue-5/20 px-6 py-1 text-blue-6"
            key={tag}
            onClick={() => handleTagClick(tag)}
          >
            # {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
