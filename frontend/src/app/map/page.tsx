"use client";

import { useState } from "react";

import EventCard from "@/components/common/list-card";
import Map from "@/components/map";
import { useMapSearch, useMapState } from "@/hooks";
import { useModalStore } from "@/store";

import MapRecommendation from "./_components/map-recommendation";
import MapSearch from "./_components/map-search";

/**
 *
 * @author 위영진
 * 경로 추천 버튼 클릭 시 recommendation-modal이 오픈 되고 해당 모달에서 데이터가 처리됩니다.
 * clickMarker는 지도에서 보여질 마커의 상세 정보를 위한 state입니다
 */

export default function MapPage() {
  const { onOpen, onSetData } = useModalStore();
  const { mapInfo, detectMoving, changeCenterPosition, loading } =
    useMapState();
  const [inputValue, setInputValue, results] = useMapSearch();
  const [recommendationRoutine, setRecommendationRoutine] = useState<
    RecommendationResponse[]
  >([]);
  const [clickedMarker, setClickedMarker] = useState(-1);
  const handleClick = () => {
    onOpen("recommendation");
    onSetData("places", mapInfo.markers);
    onSetData("currentPosition", mapInfo.currentPosition);
    onSetData("onSuccess", setRecommendationRoutine);
  };
  const handleClickMarker = (id: number) => {
    setClickedMarker((p) => (p === id ? -1 : id));
  };

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
            clickedMarker={clickedMarker}
            onClickMarker={handleClickMarker}
            handleChange={detectMoving}
            className="w-full"
          />

          <MapRecommendation recommendationRoutine={recommendationRoutine} />

          <article className="px-10">
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
