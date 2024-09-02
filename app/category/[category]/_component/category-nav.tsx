import CategoryNavTags from "./category-nav/category-nav-tags";
import CategoryNavRegion from "./category-nav/category-nav-Region";
import CategoryNavDate from "./category-nav/category-nav-date";
import { Dispatch, SetStateAction } from "react";

interface CategoryNavProps {
  handleDate: (s: Date, e: Date) => void;
  setSearchRegions: Dispatch<SetStateAction<ISearchRegion[]>>;
  setSearchTags: Dispatch<SetStateAction<IPublicTag[]>>;
  searchRegions: ISearchRegion[];
  searchTags: IPublicTag[];
}

const CatagoryNav = ({
  handleDate,
  setSearchTags,
  setSearchRegions,
  searchRegions,
  searchTags,
}: CategoryNavProps) => {
  return (
    <nav className="space-y-1 text-xs">
      <CategoryNavDate handleDate={handleDate} />
      <CategoryNavRegion
        searchRegions={searchRegions}
        setSearchRegions={setSearchRegions}
      />
      <CategoryNavTags searchTags={searchTags} setSearchTags={setSearchTags} />
    </nav>
  );
};

export default CatagoryNav;
