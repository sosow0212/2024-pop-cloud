import { REGIONS } from "@/constants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const CategoryNavRegion = ({
  searchRegions,
  setSearchRegions,
}: {
  searchRegions: ISearchRegion[];
  setSearchRegions: Dispatch<SetStateAction<ISearchRegion[]>>;
}) => {
  return (
    <div className="flex items-center space-x-2 whitespace-nowrap py-1">
      <label className="font-semibold" htmlFor="location-options">
        지역
      </label>
      <ul className="flex items-center justify-between space-x-2 overflow-auto py-2 scrollbar-hide">
        <Total
          searchRegions={searchRegions}
          setSearchRegions={setSearchRegions}
        />
        {REGIONS.map((region: ISearchRegion) => (
          <Li
            searchRegions={searchRegions}
            key={region}
            title={region}
            setSearchRegions={setSearchRegions}
          />
        ))}
      </ul>
    </div>
  );
};

const Total = ({
  searchRegions,
  setSearchRegions,
}: {
  searchRegions: ISearchRegion[];
  setSearchRegions: Dispatch<SetStateAction<ISearchRegion[]>>;
}) => {
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    searchRegions.length === REGIONS.length
      ? setIsChecked(true)
      : setIsChecked(false);
  }, [searchRegions.length]);

  const handleClick = (inputCheck: boolean) => {
    inputCheck ? setSearchRegions(REGIONS) : setSearchRegions([]);
  };

  return (
    <li>
      <input
        onChange={(e) => handleClick(e.target.checked)}
        className="peer hidden"
        type="checkbox"
        name="region-total"
        id="region-total"
        checked={isChecked}
      />
      <label
        className="cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70 peer-checked:bg-black/95"
        htmlFor="region-total"
      >
        전체
      </label>
    </li>
  );
};

const Li = ({
  title,
  searchRegions,
  setSearchRegions,
}: {
  title: ISearchRegion;

  searchRegions: ISearchRegion[];
  setSearchRegions: Dispatch<SetStateAction<ISearchRegion[]>>;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    searchRegions.includes(title) ? setIsChecked(true) : setIsChecked(false);
  }, [searchRegions, title]);

  const handleClick = (inputCheck: boolean) => {
    setIsChecked(inputCheck);
    inputCheck
      ? setSearchRegions((p) => [...p, title])
      : setSearchRegions((p) => p.filter((t) => title !== t));
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

export default CategoryNavRegion;
