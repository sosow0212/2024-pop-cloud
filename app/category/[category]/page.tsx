interface CategoryProps {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
  };
}

const CategoryPage = ({
  params,
  searchParams: { page = "1" },
}: CategoryProps) => {
  return (
    <div className="h-full bg-red-500">
      {params.category}
      {page}
    </div>
  );
};

export default CategoryPage;
