import { redirect } from "next/navigation";
import CategoryMain from "./_component/category-main";

interface CategoryProps {
  params: {
    category: "popup" | "exhibition";
  };
}

const CategoryPage = ({ params }: CategoryProps) => {
  if (!["popup", "exhibition"].includes(params.category)) redirect("/");
  return <CategoryMain category={params.category} />;
};

export default CategoryPage;
