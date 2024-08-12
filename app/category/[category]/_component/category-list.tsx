import ContentCard from "@/components/ui/content-card";

interface CategoryListProps {
  categoryType: "popup" | "exhibition";
}

const CategoryList = ({ categoryType }: CategoryListProps) => {
  return (
    <article className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {Array.from({ length: 12 }).map((_, idx) => (
        <ContentCard key={idx} cardId="12312nsad" categoryType={categoryType} />
      ))}
    </article>
  );
};

export default CategoryList;
