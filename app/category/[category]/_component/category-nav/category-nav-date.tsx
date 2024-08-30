import { useEffect, useState } from "react";
import { CategoryCalendar } from "../category-calender";

const CategoryNavDate = ({
  handleDate,
}: {
  handleDate: (s: Date, e: Date) => void;
}) => {
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [openCalender, setOpenCalender] = useState(false);

  const handleClick = (day: number, btnIdx: number) => {
    const today = new Date();
    const targetDay = new Date(today.getTime() + 1000 * 60 * 60 * 24 * day);
    handleDate(today, targetDay);
    setSelectedBtn(btnIdx);
    setOpenCalender(false);
  };

  const handleOpenCalender = () => {
    setOpenCalender((p) => !p);
    setSelectedBtn(3);
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="font-semibold" htmlFor="data-options ">
        날짜
      </label>
      <ul className="flex items-center justify-between space-x-4 scrollbar-hide">
        <li>
          <button
            className={`cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70 ${selectedBtn === 0 && "bg-black/95"}`}
            onClick={() => handleClick(0, 0)}
          >
            오늘
          </button>
        </li>
        <li>
          <button
            onClick={() => handleClick(7, 1)}
            className={`cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70 ${selectedBtn === 1 && "bg-black/95"}`}
          >
            +7일
          </button>
        </li>
        <li>
          <button
            onClick={() => handleClick(14, 2)}
            className={`cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70 ${selectedBtn === 2 && "bg-black/95"}`}
          >
            +2주
          </button>
        </li>
        <li className="relative">
          <button
            onClick={handleOpenCalender}
            className={`cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70 ${selectedBtn === 3 && "bg-black/95"}`}
          >
            직접 선택
          </button>
          <CategoryCalendar
            handleDate={handleDate}
            isOpen={openCalender}
            className="absolute left-1/2 top-7 -translate-x-[50%]"
          />
        </li>
      </ul>
    </div>
  );
};

export default CategoryNavDate;
