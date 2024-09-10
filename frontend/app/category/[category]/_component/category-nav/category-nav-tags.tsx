import { PUBLIC_TAGS } from "@/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

/**
 *
 * @will swiper slider -> drag scroll + button
 */

const CategoryNavTags = ({
  searchTags,
  setSearchTags,
}: {
  searchTags: IPublicTag[];
  setSearchTags: Dispatch<SetStateAction<IPublicTag[]>>;
}) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const handleArrow = (
    e: React.MouseEvent<HTMLButtonElement>,
    direction: "right" | "left",
  ) => {
    e.preventDefault();
    console.log(ulRef.current?.clientWidth);
  };
  return (
    <div className="flex items-center space-x-2 whitespace-nowrap">
      <label className="font-semibold" htmlFor="location-options">
        태그
      </label>
      <Total searchTags={searchTags} setSearchTags={setSearchTags} />
      <div className="group relative w-full overflow-hidden">
        <button
          onClick={(e) => handleArrow(e, "left")}
          className="absolute -left-1 top-1/2 -translate-y-1/2 font-extrabold text-blue-400 transition-all group-hover:block"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={(e) => handleArrow(e, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 font-extrabold text-blue-400 transition-all group-hover:block"
        >
          <ChevronRight />
        </button>
        <ul
          ref={ulRef}
          className="flex select-none items-center justify-start gap-x-2 overflow-auto py-2 scrollbar-hide"
        >
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
  }, [searchTags]);

  const handleClick = (inputCheck: boolean) => {
    inputCheck ? setSearchTags(PUBLIC_TAGS) : setSearchTags([]);
  };

  return (
    <li
      style={{
        listStyle: "none",
      }}
    >
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
