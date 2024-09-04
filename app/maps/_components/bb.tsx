"use client";

import { PUBLIC_TAGS } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BB = () => {
  return (
    <div className="flex items-center space-x-2 whitespace-nowrap">
      <label className="font-semibold" htmlFor="location-options">
        태그
      </label>
      <Total />
      <div>
        <div className="group relative w-full">
          {/* <button
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
        </button> */}

          <Swiper>
            {PUBLIC_TAGS.map((tag: IPublicTag) => (
              <SwiperSlide key={tag} className="bg-red-500">
                <Li title={tag} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

const Total = () => {
  return (
    <li
      style={{
        listStyle: "none",
      }}
    >
      <input
        className="peer hidden"
        type="checkbox"
        name="tag-total"
        id="tag-total"
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

const Li = ({ title }: { title: IPublicTag }) => {
  return (
    <div
      key={title}
      style={{
        listStyle: "none",
      }}
    >
      <input className="peer hidden" type="checkbox" name={title} id={title} />
      <label
        className="cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70 peer-checked:bg-black/95"
        htmlFor={title}
      >
        {title}
      </label>
    </div>
  );
};

export default BB;
