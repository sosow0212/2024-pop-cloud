import ContentCard from "@/components/ui/content-card";
import { useInView } from "framer-motion";
import { RefObject } from "react";

interface CategoryListProps {
  categoryType: "popup" | "exhibition";
  bottomRef: RefObject<HTMLInputElement>;
}

const CategoryList = ({ categoryType, bottomRef }: CategoryListProps) => {
  return (
    <article className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {Array.from({ length: 12 }).map((_, idx) => (
        // id로 바꿀것

        <ContentCard
          key={idx}
          isLastCard={idx === 11}
          bottomRef={bottomRef}
          cardId="12312nsad"
          categoryType={categoryType}
        />
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
