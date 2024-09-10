import ContentCard from "@/components/ui/content-card";
import { useInView } from "framer-motion";
import { RefObject, useEffect, useState } from "react";

interface CategoryListProps {
  categoryType: "popup" | "exhibition";

  inView: boolean;
}

const CategoryList = ({
  categoryType,

  inView,
}: CategoryListProps) => {
  const [cnt, setCnt] = useState(12);
  useEffect(() => {
    if (inView && cnt < 50) setCnt((p) => (p += 12));
  }, [inView]);
  return (
    <article className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {Array.from({ length: cnt }).map((_, idx) => (
        // id로 바꿀것

        <ContentCard key={idx} cardId={idx} categoryType={categoryType} />
      ))}
    </article>
  );
};

CategoryList.skeleton = () => {
  return (
    <article className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, idx) => (
        <ContentCard.skeleton key={idx} />
      ))}
    </article>
  );
};

export default CategoryList;
