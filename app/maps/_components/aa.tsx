"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { PUBLIC_TAGS } from "@/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const AA = ({}) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const handleArrow = (
    e: React.MouseEvent<HTMLButtonElement>,
    direction: "right" | "left",
  ) => {
    e.preventDefault();
    console.log(ulRef.current?.clientWidth);
  };
  return (
    <Carousel
      orientation="horizontal"
      className="flex items-center space-x-2 whitespace-nowrap"
    >
      <label className="font-semibold" htmlFor="location-options">
        태그
      </label>
      <Total />
      <CarouselContent>
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

          <ul
            ref={ulRef}
            className="flex select-none items-center justify-start overflow-auto py-2 scrollbar-hide"
          >
            {PUBLIC_TAGS.map((tag: IPublicTag) => (
              <CarouselItem key={tag} className="basis-1/10">
                <Li title={tag} />
              </CarouselItem>
            ))}
          </ul>
        </div>
      </CarouselContent>
    </Carousel>
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
    <li key={title}>
      <input className="peer hidden" type="checkbox" name={title} id={title} />
      <label
        className="cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70 peer-checked:bg-black/95"
        htmlFor={title}
      >
        {title}
      </label>
    </li>
  );
};

export default AA;
