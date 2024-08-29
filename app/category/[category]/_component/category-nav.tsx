import CategoryNavTags from "./category-nav/category-nav-tags";
import CategoryNavRegion from "./category-nav/category-nav-Region";
import CategoryNavDate from "./category-nav/category-nav-date";

interface CategoryNavProps {
  handleDate: (s: Date, e: Date) => void;
  handleRegions: (v: ISearchRegion, isAdd: boolean) => void;
  handleTags: (v: IPublicTag, isAdd: boolean) => void;
}

const CatagoryNav = ({
  handleDate,
  handleRegions,
  handleTags,
}: CategoryNavProps) => {
  return (
    <nav className="space-y-1 text-xs">
      {/* 날짜 선택 */}
      <CategoryNavDate handleDate={handleDate} />
      {/* 지역 선택 */}
      <CategoryNavRegion handleRegions={handleRegions} />
      {/* 태그 선택 */}
      <CategoryNavTags handleTags={handleTags} />
    </nav>
  );
};

export default CatagoryNav;
