import CategoryMain from "./_component/category-main";

interface CategoryProps {
  params: {
    category: "popup" | "exhibition";
  };
}

const CategoryPage = ({ params }: CategoryProps) => {
  return <CategoryMain category={params.category} />;
};

export default CategoryPage;
