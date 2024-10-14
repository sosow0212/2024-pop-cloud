"use client";

// import EventCard from "@/components/common/list-card";

import { useState } from "react";

import Map from "@/components/map";
import { useMapSearch, useMapState } from "@/hooks";
import { useModalStore } from "@/store";

import MapSearch from "./_components/map-search";

// const event = {
//   id: 1,
//   title: "아보디저트 팝업스토어",
//   location: "서울특별시 송파구",
//   startDate: "2024-09-02T00:00:00",
//   endDate: "2024-09-24T00:00:00",
//   image: "/images/luffi.jpg",
// };

export default function MapPage() {
  const { mapInfo, detectMoving, changeCenterPosition, loading } =
    useMapState();
  const [inputValue, setInputValue, results] = useMapSearch();
  const { onOpen, onSetData } = useModalStore();
  const [recommendationRoutine, setRecommendationRoutine] = useState<string[]>(
    [],
  );
  const handleClick = () => {
    onOpen("recommendation");
    onSetData("places", mapInfo.markers);
    onSetData("currentPosition", mapInfo.currentPosition);
    onSetData("onSuccess", setRecommendationRoutine);
  };

  return (
    <section className="mapPage-px space-y-10">
      <div className="flex items-center justify-between ">
        <button
          type="button"
          onClick={handleClick}
          className="mr-10 whitespace-nowrap rounded-md bg-blue-5 px-4 py-8 text-white hover:bg-blue-6 md:px-12"
        >
          경로 추천 받기
        </button>
        <MapSearch
          inputValue={inputValue}
          setInputValue={setInputValue}
          results={results}
          onChangeValue={changeCenterPosition}
        />
      </div>
      {loading ? (
        <div className="relative h-500 animate-pulse bg-slate-300" />
      ) : (
        <>
          <Map
            mapInfo={mapInfo}
            handleChange={detectMoving}
            className="w-full"
          />

          {recommendationRoutine.length > 0 && (
            <article>
              <h5>추천 경로</h5>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                {recommendationRoutine.map((place) => (
                  <div className="h-100 bg-slate-300" key={place}>
                    {place}
                  </div>
                ))}
              </div>
            </article>
          )}

          <article>
            <h5>장소 정보</h5>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {mapInfo.markers.map((marker) => (
                <div className="h-100 bg-slate-400" key={marker.id}>
                  {marker.title}
                </div>
              ))}
            </div>
          </article>
        </>
      )}
    </section>
  );
}
