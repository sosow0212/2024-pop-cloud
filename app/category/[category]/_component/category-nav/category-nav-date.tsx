import { useState } from "react";
import { CategoryCalendar } from "../category-calender";

const CategoryNavDate = ({
  handleDate,
}: {
  handleDate: (s: Date, e: Date) => void;
}) => {
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [openCalender, setOpenCalender] = useState(false);

  const handleClick = () => {};
  return (
    <div className="flex items-center space-x-2">
      <label className="font-semibold" htmlFor="data-options ">
        날짜
      </label>
      <ul className="scrollbar-hide flex items-center justify-between space-x-4">
        <li>
          <button className="cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70">
            오늘
          </button>
        </li>
        <li>
          <button className="cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70">
            +7일
          </button>
        </li>
        <li>
          <button className="cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70">
            +2주
          </button>
        </li>
        <li className="relative">
          <button
            onClick={() => setOpenCalender((p) => !p)}
            className="cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70"
          >
            직접 선택
          </button>
          <CategoryCalendar
            isOpen={openCalender}
            className="absolute left-1/2 top-7 -translate-x-[50%]"
          />
        </li>
      </ul>
    </div>
  );
};

export default CategoryNavDate;
