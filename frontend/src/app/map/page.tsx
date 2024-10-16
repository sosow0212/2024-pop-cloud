"use client";

import { useState } from "react";

import Map from "@/components/map";
import { useMapState } from "@/hooks";

import MapSidebar from "./_components/map-sidebar";

/**
 *
 * @author 위영진
 * 경로 추천 버튼 클릭 시 recommendation-modal이 오픈 되고 해당 모달에서 데이터가 처리됩니다.
 * clickMarker는 지도에서 보여질 마커의 상세 정보를 위한 state입니다
 */

export default function MapPage() {
  const { mapInfo, detectMoving, changeCenterPosition, loading } =
    useMapState();

  const [clickedMarker, setClickedMarker] = useState(-1);

  const handleClickMarker = (id: number) => {
    setClickedMarker((p) => (p === id ? -1 : id));
  };

  if (loading)
    return <section className="size-full animate-pulse bg-slate-300" />;
  return (
    <section className="relative h-full">
      <MapSidebar
        mapInfo={mapInfo}
        changeCenterPosition={changeCenterPosition}
        clickedMarkerId={clickedMarker}
      />
      <Map
        mapInfo={mapInfo}
        clickedMarker={clickedMarker}
        onClickMarker={handleClickMarker}
        handleChange={detectMoving}
        className="size-full"
      />
    </section>
  );
}
