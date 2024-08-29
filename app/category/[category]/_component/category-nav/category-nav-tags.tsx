import { PUBLIC_TAGS } from "@/constants";
import CategoryLi from "./category-li";

const CategoryNavTags = ({
  handleTags,
}: {
  handleTags: (v: IPublicTag, isAdd: boolean) => void;
}) => {
  return (
    <div className="flex items-center space-x-2 whitespace-nowrap">
      <label className="font-semibold" htmlFor="location-options">
        태그
      </label>
      <ul className="flex items-center justify-between space-x-4 overflow-auto py-2 scrollbar-hide">
        {PUBLIC_TAGS.map((tag: IPublicTag) => (
          <CategoryLi handleClick={handleTags} key={tag} title={tag} />
        ))}
      </ul>
    </div>
  );
};

export default CategoryNavTags;
