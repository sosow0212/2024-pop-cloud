"use client";

import { useEffect, useRef, useState } from "react";

import EventCard from "@/components/common/list-card";
import Map from "@/components/map";
import { useMapSearch, useMapState } from "@/hooks";
import { useModalStore } from "@/store";

import MapSearch from "./_components/map-search";

export default function MapPage() {
  const { onOpen, onSetData } = useModalStore();
  const { mapInfo, detectMoving, changeCenterPosition, loading } =
    useMapState();
  const [inputValue, setInputValue, results] = useMapSearch();
  const [recommendationRoutine, setRecommendationRoutine] = useState<string[]>(
    [],
  );
  const recommendationCircleRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    onOpen("recommendation");
    onSetData("places", mapInfo.markers);
    onSetData("currentPosition", mapInfo.currentPosition);
    onSetData("onSuccess", setRecommendationRoutine);
  };

  useEffect(() => {
    if (recommendationRoutine.length > 0) {
      recommendationCircleRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [recommendationRoutine]);

  return (
    <section className="mapPage-px space-y-10">
      <div className="px flex items-center justify-between px-5">
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
            <article className="flex flex-col items-center justify-center gap-y-20">
              <h5 className="rounded-md bg-slate-200 px-12 py-8 ">추천 경로</h5>
              <div ref={recommendationCircleRef} className="size-300">
                <div className="relative size-full rounded-full border">
                  <div className="recommedation-start left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 ">
                    Start
                  </div>
                  <div className="recommedation-point left-1/2 top-10 -translate-x-1/2 ">
                    첫번째
                  </div>
                  <div className="recommedation-point right-10 top-1/2 -translate-y-1/2">
                    두번째
                  </div>
                  <div className="recommedation-point bottom-10 left-1/2 -translate-x-1/2">
                    세번째
                  </div>
                  <div className="recommedation-point left-10 top-1/2 -translate-y-1/2">
                    도착점
                  </div>
                  <svg className="recommedation-path">
                    <path d="M150,150 L150,30 A120,120 0 1,1 149.99,30" />
                  </svg>
                </div>
              </div>
            </article>
          )}

          <article className="px-10">
            <h5>장소 정보</h5>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {mapInfo.markers.map((marker) => (
                <EventCard
                  key={marker.id}
                  event={{
                    id: marker.id,
                    startDate: marker.startDate,
                    endDate: marker.endDate,
                    image: "/images/luffi.jpg",
                    location: marker.position.location,
                    title: marker.title,
                  }}
                />
              ))}
            </div>
          </article>
        </>
      )}
    </section>
  );
}
