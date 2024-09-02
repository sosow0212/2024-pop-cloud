import { PUBLIC_TAGS } from "@/constants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const CategoryNavTags = ({
  searchTags,
  setSearchTags,
}: {
  searchTags: IPublicTag[];
  setSearchTags: Dispatch<SetStateAction<IPublicTag[]>>;
}) => {
  return (
    <div className="flex items-center space-x-2 whitespace-nowrap">
      <label className="font-semibold" htmlFor="location-options">
        태그
      </label>
      <ul className="flex items-center justify-between space-x-4 overflow-auto py-2 scrollbar-hide">
        <Total searchTags={searchTags} setSearchTags={setSearchTags} />
        {PUBLIC_TAGS.map((tag: IPublicTag) => (
          <Li
            key={tag}
            title={tag}
            searchTags={searchTags}
            setSearchTags={setSearchTags}
          />
        ))}
      </ul>
    </div>
  );
};

const Total = ({
  searchTags,
  setSearchTags,
}: {
  searchTags: IPublicTag[];
  setSearchTags: Dispatch<SetStateAction<IPublicTag[]>>;
}) => {
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    searchTags.length === PUBLIC_TAGS.length
      ? setIsChecked(true)
      : setIsChecked(false);
  }, [searchTags.length]);

  const handleClick = (inputCheck: boolean) => {
    inputCheck ? setSearchTags(PUBLIC_TAGS) : setSearchTags([]);
  };

  return (
    <li>
      <input
        onChange={(e) => handleClick(e.target.checked)}
        className="peer hidden"
        type="checkbox"
        name="tag-total"
        id="tag-total"
        checked={isChecked}
      />
      <label
        className="cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70 peer-checked:bg-black/95"
        htmlFor="tag-total"
      >
        전체
      </label>
    </li>
  );
};

const Li = ({
  searchTags,
  setSearchTags,
  title,
}: {
  title: IPublicTag;

  searchTags: IPublicTag[];
  setSearchTags: Dispatch<SetStateAction<IPublicTag[]>>;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    searchTags.includes(title) ? setIsChecked(true) : setIsChecked(false);
  }, [searchTags, title]);

  const handleClick = (inputCheck: boolean) => {
    setIsChecked(inputCheck);
    inputCheck
      ? setSearchTags((p) => [...p, title])
      : setSearchTags((p) => p.filter((t) => title !== t));
  };
  return (
    <li key={title}>
      <input
        onChange={(e) => handleClick(e.target.checked)}
        className="peer hidden"
        type="checkbox"
        name={title}
        id={title}
        checked={isChecked}
      />
      <label
        className="cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70 peer-checked:bg-black/95"
        htmlFor={title}
      >
        {title}
      </label>
    </li>
  );
};

export default CategoryNavTags;
