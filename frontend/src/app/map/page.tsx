"use client";

// import EventCard from "@/components/common/list-card";

import { useEffect, useRef, useState } from "react";

import Map from "@/components/map";
import { useMapState } from "@/hooks";
// import { useModalStore } from "@/store";

// const event = {
//   id: 1,
//   title: "아보디저트 팝업스토어",
//   location: "서울특별시 송파구",
//   startDate: "2024-09-02T00:00:00",
//   endDate: "2024-09-24T00:00:00",
//   image: "/images/luffi.jpg",
// };

type SearchResultType = {
  placeName: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  id: string;
};

export default function MapPage() {
  const { mapInfo, detectMoving } = useMapState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    if (debounce === "") {
      setSearchResults([]);
      return;
    }
    const ps = new kakao.maps.services.Places();
    const searchPlaces = () => {
      ps.keywordSearch(debounce, (data) => {
        if (!data) setSearchResults([]);
        setSearchResults(() =>
          data.slice(0, 5).map((d) => ({
            id: d.id,
            placeName: d.place_name,
            category: d.category_group_name,
            address: d.address_name,
            lat: +d.y,
            lng: +d.x,
          })),
        );
      });
    };
    searchPlaces();
  }, [debounce]);

  useEffect(() => {
    setTimeout(() => {
      setDebounce(inputValue);
    }, 500);
  }, [inputValue]);

  return (
    <section className="mapPage-px space-y-10">
      <div className="flex items-center justify-end">
        <div className="relative w-full max-w-xl">
          <input
            ref={inputRef}
            className="peer w-full rounded-md border py-10 pl-5 pr-60"
            placeholder="키워드로 장소 지정"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <ul
            className={`absolute inset-x-0 top-full z-50 hidden divide-y overflow-y-auto rounded-md  border-black bg-white shadow-sm peer-focus:block ${searchResults.length && "border"} `}
          >
            {searchResults.map((result) => (
              <li key={result.id} className="px-10 py-5">
                <h5 className="my-5 text-18 font-extrabold">
                  {result.placeName}
                </h5>
                <p className="text-14 text-slate-400">{result.category}</p>
                <span className="text-14 text-slate-500">{result.address}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Map mapInfo={mapInfo} handleChange={detectMoving} className="w-full" />

      <article className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* {mapInfo.markers.map((marker)=>(
          <EventCard key={marker.info.id} {...marker.info}    />
        ))} */}
        {/* <EventCard event={event} />
        <EventCard event={event} />
        <EventCard event={event} /> */}
      </article>
    </section>
  );
}
