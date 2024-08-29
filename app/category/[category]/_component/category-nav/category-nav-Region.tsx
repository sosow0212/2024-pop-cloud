import { REGIONS } from "@/constants/region";
import CategoryLi from "./category-li";

const CategoryNavRegion = ({
  handleRegions,
}: {
  handleRegions: (v: ISearchRegion, isAdd: boolean) => void;
}) => {
  return (
    <div className="flex items-center space-x-2 whitespace-nowrap py-1">
      <label className="font-semibold" htmlFor="location-options">
        지역
      </label>
      <ul className="scrollbar-hide flex items-center justify-between space-x-2 overflow-auto py-2">
        {REGIONS.map((region) => (
          <CategoryLi key={region} title={region} />
        ))}
      </ul>
    </div>
  );
};

export default CategoryNavRegion;
