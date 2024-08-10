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
    <div>
      {params.category}
      {page}
    </div>
  );
};

export default CategoryPage;
